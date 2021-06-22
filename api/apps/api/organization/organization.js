'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
const helpers_ = require('../helpers').helpers
let helpers;
let sequelize, Familyfe;


class authority extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}

	saveOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { userId, organizationName } = req.body;
			organizationName = organizationName.replace(/^[ ]+/g, '')
			let organizationNameLowerCase = organizationName.toLowerCase();
			let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationNameLowerCase, userUserId: userId } }))
			if (err) return reject(err)
			if (care) return reject({ status: 422, message: `${userId} already has an organization called ${organizationName}` });
			;[err, care] = await to(this.sequelize.models.organizations.create({ userUserId: userId, organizationName, organizationNameLowerCase }))

			let ret = care.dataValues;
			ret.userId = care.dataValues.userUserId
			delete ret.userUserId
			delete ret.organizationNameLowerCase
			let { organizationId } = ret;
			;[err, care] = await to(this.sequelize.models.organizationUser.create({ userUserId: userId, organizationOrganizationId: organizationId, authority: 'ORG_ADMIN' }))
			resolve(ret);
		})
	}

	deleteOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let organizationId = req.query.organizationId;
			let [err, care] = await to(this.sequelize.models.organizations.destroy({ where: { organizationId } }))
			return resolve();
		})
	}

	patchOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let organizationId = req.query.organizationId;
			let organizationName = req.body.organizationName;

			organizationName = organizationName.replace(/^[ ]+/g, '')
			let organizationNameLowerCase = organizationName.toLowerCase();

			let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			if (err) return reject(err)
			let userId = care.dataValues.userUserId
			let organization = care;
			;[err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationNameLowerCase, userUserId: userId } }))
			if (err) return reject(err)
			if (care) return reject({ status: 422, message: `${userId} already has an organization called ${organizationName}` });
			// ;[err, care] = await to(this.sequelize.models.organizations.create({ userUserId: userId, organizationName, organizationNameLowerCase }))

			// let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			await to(organization.update({ organizationName: organizationName, organizationNameLowerCase }));
			;[err, care] = await to(this.getOrganization(req, res, next));
			return resolve(care);
		})
	}

	getOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let organizationId = req.query.organizationId;
			let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			if (err) return reject(err);
			let ret = care.dataValues
			delete ret.organizationNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			return resolve(ret);
		})
	}

	saveOrganizationUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let organizationId = req.body.organizationId;
			let userId = req.body.userId;
			let email = req.body.email;
			email = email.toLowerCase()
			let authority = req.body.authority;
			let where = { organizationOrganizationId: organizationId, userUserId: userId, authority }
			let outerWhere = {}
			if (!userId || userId === undefined) {
				delete where.userUserId
				// else {
				outerWhere.email = email
			}
			// console.log(!userId, !userId || userId)
			// console.log({ userId, where, outerWhere })

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizationUser,
							where
						},
					]
			};


			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: outerWhere }, associated)));
			if (err) return reject(err);
			if (care) {
				console.log(care)
				return reject({ status: 422, message: `User already exists` })
			}
			if (!userId) {
				;[err, care] = await to(this.sequelize.models.users.findOne({ where: { email: email } }));
				userId = care.dataValues.userId
			}

			;[err, care] = await to(this.sequelize.models.organizationUser.create({ organizationOrganizationId: organizationId, userUserId: userId, authority }));
			if (err) return reject(err);
			;[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationOrganizationId: organizationId, userUserId: userId, authority } }))
			let ret = care.dataValues
			// delete ret.organizationNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			delete ret.organizationOrganizationId
			return resolve(ret);
		})
	}

	editOrganizationUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId, userId, authority } = req.body;
			let [err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationOrganizationId: organizationId, userUserId: userId } }))
			if (err) return reject(err);
			// if (care) {
			// 	return reject({ status: 422, message: `User already exists` })
			// }
			let orgUser = care
				;[err, care] = await to(orgUser.update({ authority }));
			if (err) return reject(err);
			;[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationOrganizationId: organizationId, userUserId: userId, authority } }))
			let ret = care.dataValues
			// delete ret.organizationNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			delete ret.organizationOrganizationId
			return resolve(ret);
		})
	}



	/** check that it's not belonging to current user */
	transferOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;

			let { userId, organizationId } = req.body;
			if (userId === authenticatedUserId && !req.isSysAdmin) {
				return reject({ status: 422, message: "You cannot transfer organization to yourself" })
			}
			let [err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
			if (!care) {
				return reject({ status: 422, message: `User ${userId} not found.` })
			}
			// check if organization exists
			;[err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			let organizationData = care;
			if (!care) return reject({ status: 422, message: `${organizationId} not found.` })
			care = care.dataValues;
			if (!req.isSysAdmin && care.userUserId !== authenticatedUserId) {
				return reject({ status: 401, message: `You are not permitted to transfer ${organizationId}` })
			}
			// organizationData
			let currentOwnerId = organizationData.dataValues.userUserId;
			let newOwnerId = userId
			await to(organizationData.update({ userUserId: userId }));
			;[err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			let ret = care.dataValues;
			ret.userId = care.dataValues.userUserId
			delete ret.userUserId

			// update organizationUser
			const changeUserAuthorityIfNotExist = async (record) => {
				let { userUserId, authority } = record
				let [err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { userUserId: newOwnerId, authority } }));
				if (!care) {
					await to(record.update({ userUserId: newOwnerId }))
				}
				if (newOwnerId !== currentOwnerId) {
					await to(this.sequelize.models.organizationUser.destroy({ where: { userUserId: currentOwnerId, authority } }));
				}
			}
				;[err, care] = await to(this.sequelize.models.organizationUser.findAll({ where: { userUserId: currentOwnerId } }))
			let promises = care.map(changeUserAuthorityIfNotExist);
			;[err, care] = await to(Promise.all(promises))
			resolve(ret);
		})
	}

	getOrganizationUsers = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { organizationId, authority } = req.query;
			let where = { organizationOrganizationId: organizationId }
			if (authority) where.authority = authority
			let filters = {}
			try {
				filters = JSON.parse(req.query.filters)
			} catch (error) { }
			// delete filters.userId
			// delete filters.email
			for (let i in filters) {
				where[i] = filters[i]
			}

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizationUser,
							where
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({}, associated)));
			let ret = [];
			// care.map(item => care.dataValues)
			care = care.map(item => item.dataValues)
			// care = care.dataValues
			care.map(item0 => {
				item0.organizationUsers.map(item => {
					item = item.dataValues || item
					item.userId = item.userUserId
					item.organizationId = item.organizationOrganizationId
					delete item.userUserId
					delete item.organizationOrganizationId
					item.email = item0.email
					item.firstName = item0.firstName
					item.lastName = item0.lastName
					ret.push(item)
					return item
				})
			})
			resolve(ret);
		})
	}
	getOrganizationOwner = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId } = req.query;
			let where = { organizationId }

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizations,
							where
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({}, associated)));
			let ret = [];
			care = care.map(item => item.dataValues)
			care.map(item0 => {
				item0.organizations.map(item => {
					item = item.dataValues || item
					item.userId = item.userUserId
					delete item.userUserId
					delete item.organizationNameLowerCase
					item.email = item0.email
					item.firstName = item0.firstName
					item.lastName = item0.lastName
					ret.push(item)
					return item
				})
			})
			resolve(ret[0]);
		})
	}
	deleteOrganizationUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { organizationId, userId } = req.query;
			let [err, care] = await to(this.sequelize.models.organizationUser.findAll({ where: { organizationOrganizationId: organizationId, authority: 'ORG_ADMIN' } }))
			let numOrgAdmins = care.length;
			if (numOrgAdmins === 1) {
				// check if is self
				;[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationOrganizationId: organizationId, authority: 'ORG_ADMIN', userUserId: userId } }))
				if (care) {
					return reject({ status: 401, message: 'You cannot delete last admin' })
				}
			}
			await to(this.sequelize.models.organizationUser.destroy({ where: { organizationOrganizationId: organizationId, userUserId: userId } }))
			resolve()
		})
	}
	/**
	 * check that authenticated user has permission to delete. Is a sys_admin or org_admin or org_owner
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	deleteOrganizationUserByOrgUserId = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { organizationUserId } = req.query;
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizationUser,
							where: { organizationUserId },
							required: true,
							// subQuery: false,
						},
					]
			};


			let [err, care] = await to(this.sequelize.models.organizations.findOne(Object.assign({ where: {}, attributes: ['organizationId'] }, associated)))
			if (err || !care) {
				return reject({ status: 422, message: `${organizationUserId} not found.` })
			}
			let { organizationId } = care.dataValues
			let userId = care.dataValues.organizationUsers[0].userUserId;
			;[err, care] = await to(this.sequelize.models.organizationUser.findAll({ where: { organizationOrganizationId: organizationId, authority: 'ORG_ADMIN' } }))
			let numOrgAdmins = care.length;
			if (numOrgAdmins === 1) {
				// check if is self
				;[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationOrganizationId: organizationId, authority: 'ORG_ADMIN', userUserId: userId } }))
				if (care) {
					return reject({ status: 401, message: 'You cannot delete last admin' })
				}
			}
			await to(this.sequelize.models.organizationUser.destroy({ where: { organizationOrganizationId: organizationId, userUserId: userId } }))
			resolve()

			// console.log(care, organizationUserId, associated);
			// return reject({ status: 422, message: `${organizationUserId} not found.` })
			// let numOrgAdmins = care.length;
			// if (numOrgAdmins === 1) {
			// 	// check if is self
			// 	;[err, care] = await to(this.sequelize.models.organizationUser.findAll({ where: { authority: 'ORG_ADMIN', userUserId: userId } }))
			// 	if (care) {
			// 		return reject({ status: 422, message: 'You cannot delete last admin' })
			// 	}
			// }
			// await to(this.sequelize.models.organizationUser.destroy({ where: { organizationOrganizationId: organizationId, userUserId: userId } }))
			// resolve()
		})
	}

	deleteOrganizationUserAuthority = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { organizationId, userId, authority } = req.query;
			if (authority === 'ORG_ADMIN') {
				let [err, care] = await to(this.sequelize.models.organizationUser.findAll({ where: { authority: 'ORG_ADMIN' } }))
				let numOrgAdmins = care.length;
				if (numOrgAdmins === 1) {
					// check if is self
					;[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { authority: 'ORG_ADMIN', userUserId: userId } }))
					if (care) {
						return reject({ status: 401, message: 'You cannot delete last admin' })
					}
				}
			}
			await to(this.sequelize.models.organizationUser.destroy({ where: { organizationOrganizationId: organizationId, userUserId: userId, authority } }))
			resolve()
		})
	}

	functionsMap = () => {
		return {
			"api/organization": {
				'POST': {
					func: this.saveOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"organization-controller"
					],
					ensureExists: [
						"user"
					],
					"summary": "saveOrganization",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"userId": { "type": "string", required: true },
										"organizationName": { type: "string", required: true },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			"api/organization?organizationId": {
				'DELETE': {
					func: this.deleteOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN", "ORG_ADMIN"]
						},
						// {
						// 	facility: ["ORG_ADMIN"]
						// },

					],
					ensureExists: [
						"organization"
					],
					"tags": [
						"organization-controller"
					],
					"summary": "deleteOrganization",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
				'GET': {
					func: this.getOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN", "ORG_ADMIN"]
						},
					],
					ensureExists: [
						"organization"
					],
					"tags": [
						"organization-controller"
					],
					"summary": "getSingleOrganization",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
				'PATCH': {
					func: this.patchOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN", "ORG_ADMIN"]
						},
					],
					ensureExists: [
						"organization"
					],
					"tags": [
						"organization-controller"
					],
					"summary": "renameOrganization",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}
					],
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"organizationName": { type: "string", required: true },
									}
								}
							}
						}
					},
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			"api/organization/transfer": {
				'POST': {
					func: this.transferOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization", "user"
					],
					"tags": [
						"organization-controller"
					],
					"summary": "transfer Organization to a different User",
					// "requestBody": {
					// 	"required": true,
					// 	"content": {
					// 		"application/json": {
					// 			"schema": {
					// 				"properties": {
					// 					"userId": { "type": "string", required: true },
					// 					"organizationName": { type: "string", required: true },
					// 				}
					// 			}
					// 		}
					// 	}
					// },
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"userId": { "type": "string", required: true },
										"organizationId": { type: "string", required: true },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},


			// "api/organization/facility?organizationId": {
			// 	'POST': {
			// 		func: this.transferOrganization,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true,
			// 		requiresChildren: [
			// 			{
			// 				organization: ["ORG_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"organization"
			// 		],
			// 		"tags": [
			// 			"facility-controller"
			// 		],
			// 		"summary": "saveFacility",
			// 		"requestBody": {
			// 			"required": true,
			// 			"content": {
			// 				"application/json": {
			// 					"schema": {
			// 						"properties": {
			// 							"facilityName": { type: "string", required: true },
			// 						}
			// 					}
			// 				}
			// 			}
			// 		},
			// 		"parameters": [
			// 			{
			// 				"name": "X-Authorization",
			// 				"in": "header",
			// 				"description": "bearer token",
			// 				"required": true,
			// 				"type": "string"
			// 			}
			// 		],
			// 		"responses": {
			// 			"200": {
			// 				"description": "OK",
			// 				"content": {
			// 					"application/json": {
			// 					}
			// 				}
			// 			}
			// 		}
			// 	},
			// },
			"api/organization/user": {
				'POST': {
					func: this.saveOrganizationUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true, // because operation is not on user
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization", "user"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "saveOrganizationUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"organizationId": { type: "string", required: true },
										"userId": { type: "string", required: true },
										"authority": { type: "string", required: true, enum: ["ORG_ADMIN", "ORG_USER"] },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
				// 'PATCH': {
				// 	func: this.editOrganizationUser,
				// 	requiresLogin: true,
				// 	requiresAdmin: false,
				// 	doForAnother: true,
				// 	requiresChildren: [
				// 		{
				// 			organization: ["ORG_ADMIN"]
				// 		}
				// 	],
				// 	ensureExists: [
				// 		"organization", "user"
				// 	],
				// 	"tags": [
				// 		"organization-user-controller"
				// 	],
				// 	"summary": "editOrganizationUser",
				// 	"requestBody": {
				// 		"required": true,
				// 		"content": {
				// 			"application/json": {
				// 				"schema": {
				// 					"properties": {
				// 						"organizationId": { type: "string", required: true },
				// 						"userId": { type: "string", required: true },
				// 						"authority": { type: "string", required: true, enum: ["ORG_ADMIN", "ORG_USER"] },
				// 					}
				// 				}
				// 			}
				// 		}
				// 	},
				// 	"parameters": [
				// 		{
				// 			"name": "X-Authorization",
				// 			"in": "header",
				// 			"description": "bearer token",
				// 			"required": true,
				// 			"type": "string"
				// 		}
				// 	],
				// 	"responses": {
				// 		"200": {
				// 			"description": "OK",
				// 			"content": {
				// 				"application/json": {
				// 				}
				// 			}
				// 		}
				// 	}
				// },
			},
			"api/organization/user?saveByEmail": {
				'POST': {
					func: this.saveOrganizationUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true, // because operation is not on user
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization", "userEmail"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "saveOrganizationUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"organizationId": { type: "string", required: true },
										"email": { type: "string", required: true },
										"authority": { type: "string", required: true, enum: ["ORG_ADMIN", "ORG_USER"] },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "saveByEmail",
							"in": "query",
							"description": "Use email to identify user",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				}
			},
			"api/organization/user?organizationId&userId": {
				'DELETE': {
					func: this.deleteOrganizationUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					doForSelf: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization", "user"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "deleteOrganizationUser",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}, {
							"name": "userId",
							"in": "query",
							"description": "userId",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			"api/organization/user?organizationUserId": {
				'DELETE': {
					func: this.deleteOrganizationUserByOrgUserId,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					doForSelf: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organizationUser"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "deleteOrganizationUser",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "organizationUserId",
							"in": "query",
							"description": "organizationUserId",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			"api/organization/user/authority?organizationId&userId&authority": {
				'DELETE': {
					func: this.deleteOrganizationUserAuthority,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					doForSelf: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization", "user"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "deleteOrganizationUserAuthority",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}, {
							"name": "userId",
							"in": "query",
							"description": "userId",
							"required": true,
							"type": "string"
						}, {
							"name": "authority",
							"in": "query",
							"description": "authority",
							"required": true,
							"type": "string",
							enum: ["ORG_ADMIN", "ORG_USER"]
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			// "api/organization/users?organizationId": {
			// 	'GET': {
			// 		func: this.getOrganizationUsers,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true,
			// 		requiresChildren: [
			// 			{
			// 				organization: ["ORG_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"organization"
			// 		],
			// 		"tags": [
			// 			"organization-user-controller"
			// 		],
			// 		"summary": "getOrganizationUsers",
			// 		"parameters": [
			// 			{
			// 				"name": "X-Authorization",
			// 				"in": "header",
			// 				"description": "bearer token",
			// 				"required": true,
			// 				"type": "string"
			// 			},
			// 			{
			// 				"name": "organizationId",
			// 				"in": "query",
			// 				"description": "organizationId",
			// 				"required": true,
			// 				"type": "string"
			// 			}
			// 		],
			// 		"responses": {
			// 			"200": {
			// 				"description": "OK",
			// 				"content": {
			// 					"application/json": {
			// 					}
			// 				}
			// 			}
			// 		}
			// 	},
			// },
			"api/organization/users?organizationId&authority&filters": {
				'GET': {
					func: this.getOrganizationUsers,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization"
					],
					"tags": [
						"organization-user-controller"
					],
					"summary": "getOrganizationUsers",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						},
						{
							"name": "authority",
							"in": "query",
							"description": "authority",
							"required": false,
							"type": "string",
							"enum": ["ORG_ADMIN", "ORG_USER"]
						}, {
							"name": "filters",
							"in": "query",
							"description": "filters",
							"required": false,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
			"api/organization/owner?organizationId": {
				'GET': {
					func: this.getOrganizationOwner,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					ensureExists: [
						"organization"
					],
					"tags": [
						"organization-controller"
					],
					"summary": "getOrganizationOwner",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "organizationId",
							"in": "query",
							"description": "organizationId",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				},
			},
		}
	}

	tagsMap = () => {
		return [
			{
				"name": "organization-controller",
				"description": "Organization Controller"
			},
			{
				"name": "facility-controller",
				"description": "Facility Controller"
			},
			{
				"name": "organization-user-controller",
				"description": "Organization User Controller"
			}
		]
	}

	async main(req, res, next) {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(helpers.processRequirements(req, res, next));
			if (err) {
				return reject(err)
			}
			let func = care.func;
			;[err, care] = await to(func(req, res, next));
			if (err) {
				return reject(err)
			}
			res.send(care)
		})
	}
}

module.exports = authority