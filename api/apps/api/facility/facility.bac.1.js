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

	saveFacility = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId, facilityName, center } = req.body;
			let coordinates = [0, 0];
			try {
				coordinates = JSON.parse(center)
			} catch (error) { }
			let location = { type: 'Point', coordinates };

			facilityName = facilityName.replace(/^[ ]+/g, '')
			let facilityNameLowerCase = facilityName.toLowerCase();
			// console.log()
			let [err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityNameLowerCase, organizationOrganizationId: organizationId } }))
			if (err) return reject(err)
			if (care) return reject({ status: 422, message: `${organizationId} already has a facility called ${facilityName}` });
			;[err, care] = await to(this.sequelize.models.facilities.create({ organizationOrganizationId: organizationId, facilityName, facilityNameLowerCase, location }))

			let ret = care.dataValues;
			ret.organizationId = care.dataValues.organizationOrganizationId
			delete ret.organizationOrganizationId
			delete ret.facilityNameLowerCase
			let { facilityId } = ret;
			resolve(ret);
		})
	}

	deleteFacility = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let facilityId = req.query.facilityId;
			let [err, care] = await to(this.sequelize.models.facilities.destroy({ where: { facilityId } }))
			return resolve();
		})
	}

	patchFacility = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let facilityId = req.query.facilityId;
			let facilityName = req.body.facilityName;

			facilityName = facilityName.replace(/^[ ]+/g, '')
			let facilityNameLowerCase = facilityName.toLowerCase();

			let [err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }))
			if (err) return reject(err)
			let organizationId = care.dataValues.organizationOrganizationId
			let facility = care;
			;[err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityNameLowerCase, organizationOrganizationId: organizationId } }))
			if (err) return reject(err)

			if (care) {
				if (care.dataValues.facilityId !== facilityId)
					return reject({ status: 422, message: `${organizationId} already has an facility called ${facilityName}` });
			}

			let { center } = req.body;
			let coordinates = [0, 0];
			try {
				coordinates = JSON.parse(center)
			} catch (error) { }
			let location = { type: 'Point', coordinates };
			// ;[err, care] = await to(this.sequelize.models.facilities.create({ userUserId: userId, facilityName, facilityNameLowerCase }))

			// let [err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }))
			await to(facility.update({ facilityName: facilityName, facilityNameLowerCase, location }));
			;[err, care] = await to(this.getFacility(req, res, next));
			return resolve(care);
		})
	}

	getFacility = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let facilityId = req.query.facilityId;
			let associated = {
				include: [
					{
						model: this.sequelize.models.organizations,
						attributes: ['organizationId', 'organizationName'],
						required: true,
						subQuery: false,
						include:
							[
								{
									model: this.sequelize.models.facilities,
									required: true,
									subQuery: false,
									attributes: ['facilityId', 'facilityName', 'location'],
									where: { facilityId }
								},
							]
					}
				]
			};
			let whereMain = {};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], }, associated)));
			if (err) return reject(err);
			let ret = [];
			care = care.map(item => item.dataValues)
			care.map(userData => {
				userData.organizations.map(organizationsData => {
					organizationsData = organizationsData.dataValues || organizationsData
					organizationsData.facilities.map(
						item => {
							item = item.dataValues || item
							let tmp = item
							tmp.email = userData.email
							tmp.firstName = userData.firstName
							tmp.lastName = userData.lastName
							tmp.authority = userData.authority
							tmp.organizationId = organizationsData.organizationId
							tmp.organizationName = organizationsData.organizationName
							ret.push(tmp)
							return item
						}
					)
				})
			})

			ret = ret[0]
			resolve(ret);
		})

		// 	let ret = care.dataValues
		// 	delete ret.facilityNameLowerCase
		// 	ret.userId = ret.userUserId;
		// 	delete ret.userUserId
		// 	return resolve(ret);
		// })
	}

	saveFacilityUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let facilityId = req.body.facilityId;
			let userId = req.body.userId;
			let email = req.body.email;

			let authority = req.body.authority;
			let where = { facilityFacilityId: facilityId, userUserId: userId, authority }
			let outerWhere = {}
			if (!userId || userId === undefined) {
				delete where.userUserId
				// else {
				outerWhere.email = email
			}
			console.log(!userId, !userId || userId)
			console.log({ userId, where, outerWhere })

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.facilityUser,
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

			;[err, care] = await to(this.sequelize.models.facilityUser.create({ facilityFacilityId: facilityId, userUserId: userId, authority }));
			if (err) return reject(err);
			;[err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { facilityFacilityId: facilityId, userUserId: userId, authority } }))
			let ret = care.dataValues
			// delete ret.facilityNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			delete ret.facilityFacilityId
			return resolve(ret);
		})
	}

	editFacilityUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { facilityId, userId, authority } = req.body;
			let [err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { facilityFacilityId: facilityId, userUserId: userId } }))
			if (err) return reject(err);
			// if (care) {
			// 	return reject({ status: 422, message: `User already exists` })
			// }
			let orgUser = care
				;[err, care] = await to(orgUser.update({ authority }));
			if (err) return reject(err);
			;[err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { facilityFacilityId: facilityId, userUserId: userId, authority } }))
			let ret = care.dataValues
			// delete ret.facilityNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			delete ret.facilityFacilityId
			return resolve(ret);
		})
	}



	// /** check that it's not belonging to current user */
	// transferFacility = async (req, res, next) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let authenticatedUserId = req.authenticatedUser.userId;

	// 		let { userId, facilityId } = req.body;
	// 		if (userId === authenticatedUserId && !req.isSysAdmin) {
	// 			return reject({ status: 422, message: "You cannot transfer facility to yourself" })
	// 		}
	// 		let [err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
	// 		if (!care) {
	// 			return reject({ status: 422, message: `User ${userId} not found.` })
	// 		}
	// 		// check if facility exists
	// 		;[err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }))
	// 		let facilityData = care;
	// 		if (!care) return reject({ status: 422, message: `${facilityId} not found.` })
	// 		care = care.dataValues;
	// 		if (!req.isSysAdmin && care.userUserId !== authenticatedUserId) {
	// 			return reject({ status: 401, message: `You are not permitted to transfer ${facilityId}` })
	// 		}
	// 		// facilityData
	// 		let currentOwnerId = facilityData.dataValues.userUserId;
	// 		let newOwnerId = userId
	// 		await to(facilityData.update({ userUserId: userId }));
	// 		;[err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }))
	// 		let ret = care.dataValues;
	// 		ret.userId = care.dataValues.userUserId
	// 		delete ret.userUserId

	// 		// update facilityUser
	// 		const changeUserAuthorityIfNotExist = async (record) => {
	// 			let { userUserId, authority } = record
	// 			let [err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { userUserId: newOwnerId, authority } }));
	// 			if (!care) {
	// 				await to(record.update({ userUserId: newOwnerId }))
	// 			}
	// 			if (newOwnerId !== currentOwnerId) {
	// 				await to(this.sequelize.models.facilityUser.destroy({ where: { userUserId: currentOwnerId, authority } }));
	// 			}
	// 		}
	// 			;[err, care] = await to(this.sequelize.models.facilityUser.findAll({ where: { userUserId: currentOwnerId } }))
	// 		let promises = care.map(changeUserAuthorityIfNotExist);
	// 		;[err, care] = await to(Promise.all(promises))
	// 		resolve(ret);
	// 	})
	// }

	getFacilityUsers = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { facilityId, authority } = req.query;
			let where = { facilityFacilityId: facilityId }
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
							model: this.sequelize.models.facilityUser,
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
				item0.facilityUsers.map(item => {
					item = item.dataValues || item
					item.userId = item.userUserId
					item.facilityId = item.facilityFacilityId
					delete item.userUserId
					delete item.facilityFacilityId
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
	getFacilityOwner = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { facilityId } = req.query;
			let where = { facilityId }

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.facilities,
							where
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({}, associated)));
			let ret = [];
			care = care.map(item => item.dataValues)
			care.map(item0 => {
				item0.facilities.map(item => {
					item = item.dataValues || item
					item.userId = item.userUserId
					delete item.userUserId
					delete item.facilityNameLowerCase
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
	deleteFacilityUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { facilityId, userId } = req.query;
			let [err, care] = await to(this.sequelize.models.facilityUser.findAll({ where: { authority: 'FACILITY_ADMIN' } }))
			let numOrgAdmins = care.length;
			if (numOrgAdmins === 1) {
				// check if is self
				;[err, care] = await to(this.sequelize.models.facilityUser.findAll({ where: { authority: 'FACILITY_ADMIN', userUserId: userId } }))
				if (care) {
					return reject({ status: 401, message: 'You cannot delete last admin' })
				}
			}
			await to(this.sequelize.models.facilityUser.destroy({ where: { facilityFacilityId: facilityId, userUserId: userId } }))
			resolve()
		})
	}
	deleteFacilityUserAuthority = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let authenticatedUserId = req.authenticatedUser.userId;
			let { facilityId, userId, authority } = req.query;
			if (authority === 'FACILITY_ADMIN') {
				let [err, care] = await to(this.sequelize.models.facilityUser.findAll({ where: { authority: 'FACILITY_ADMIN' } }))
				let numOrgAdmins = care.length;
				if (numOrgAdmins === 1) {
					// check if is self
					;[err, care] = await to(this.sequelize.models.facilityUser.findAll({ where: { authority: 'FACILITY_ADMIN', userUserId: userId } }))
					if (care) {
						return reject({ status: 401, message: 'You cannot delete last admin' })
					}
				}
			}
			await to(this.sequelize.models.facilityUser.destroy({ where: { facilityFacilityId: facilityId, userUserId: userId, authority } }))
			resolve()
		})
	}

	saveFacilityUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let facilityId = req.body.facilityId;
			// console.log(req.body)
			let userId = req.body.userId;
			let email = req.body.email;
			let authority = req.body.authority;
			let where = { facilityFacilityId: facilityId, userUserId: userId, authority }
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
							model: this.sequelize.models.facilityUser,
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

			;[err, care] = await to(this.sequelize.models.facilityUser.create({ facilityFacilityId: facilityId, userUserId: userId, authority }));
			if (err) return reject(err);
			;[err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { facilityFacilityId: facilityId, userUserId: userId, authority } }))
			let ret = care.dataValues
			// delete ret.facilityNameLowerCase
			ret.userId = ret.userUserId;
			delete ret.userUserId
			delete ret.facilityFacilityId
			return resolve(ret);
		})
	}

	transferFacility = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			/* can only transfer as ORG_ADMIN or as SYS_admin */
			let authenticatedUserId = req.authenticatedUser.userId;
			// 
			let { organizationName, facilityId, email } = req.body
			organizationName = organizationName.replace(/^[ ]+/g, '')
			let organizationNameLowerCase = organizationName.toLowerCase();
			if (!req.isSysAdmin) {
				let associated = {
					include: [
						{
							model: this.sequelize.models.organizations,
							// attributes: ['authority'],
							where: { organizationNameLowerCase },
							include: [
								{
									model: this.sequelize.models.organizationUser,
									where: { authority: "ORG_ADMIN" },
									required: true,
									subQuery: false,
								},

								{
									model: this.sequelize.models.facilities,
									required: true,
									subQuery: false,
									attributes: ['facilityId', 'facilityName', 'location'],
									where: { facilityId }
								},
							]
						}
					]
				};
				let whereMain = { userId: authenticatedUserId };
				let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], }, associated)));
				if (!care || care.length === 0) {
					return reject({ status: 422, message: `You do not have permission to transfer facility:${facilityId} belonging to ${organizationName}` })
				}
			}

			let associated = {
				include: [
					{
						model: this.sequelize.models.organizations,
						where: { organizationNameLowerCase },
						include: [
							// {
							// 	model: this.sequelize.models.organizationUser,
							// 	where: { authority: "ORG_ADMIN" },
							// 	required: true,
							// 	subQuery: false,
							// },
							{
								model: this.sequelize.models.facilities,
								required: true,
								subQuery: false,
								attributes: ['facilityId', 'facilityName', 'location'],
								where: { facilityId }
							},
						]
					}
				]
			};
			let whereMain = { email };
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], }, associated)));

			if (care && care.length > 0) {
				return reject({ status: 422, message: "You cannot transfer facility to its own organization" })
			}

			associated = {
				include: [
					{
						model: this.sequelize.models.organizations,
						required: true,
						subQuery: false,
						attributes: ['organizationId'],
						where: { organizationNameLowerCase }
					},
				]
			};
			whereMain = { email };
			;[err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId'], }, associated)));

			if (!care || care.length === 0) {
				return reject({ status: 422, message: `Organization:${organizationName} not found for ${email}` })
			}
			let organizationId = care[0].dataValues.organizations[0].organizationId;
			;[err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }))
			let facility = care;
			;[err, care] = await to(facility.update({ organizationOrganizationId: organizationId }))
			return resolve({})
		})
	}

	functionsMap = () => {
		return {
			// "api/facility/user?saveByEmail": {
			// 	'POST': {
			// 		func: this.saveFacilityUser,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true, // because operation is not on user
			// 		requiresChildren: [
			// 			{
			// 				organization: ["ORG_ADMIN"],
			// 				facility: ["FACILITY_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"facility", "userEmail"
			// 		],
			// 		"tags": [
			// 			"facility-user-controller"
			// 		],
			// 		"summary": "saveFacilityUser",
			// 		"requestBody": {
			// 			"required": true,
			// 			"content": {
			// 				"application/json": {
			// 					"schema": {
			// 						"properties": {
			// 							"facilityId": { type: "string", required: true },
			// 							"email": { type: "string", required: true },
			// 							"authority": { type: "string", required: true, enum: ["ORG_ADMIN", "ORG_USER"] },
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
			// 			}, {
			// 				"name": "saveByEmail",
			// 				"in": "query",
			// 				"description": "Use email to identify user",
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
			// 	}
			// },
			// "api/facility/transfer": {
			// 	'POST': {
			// 		func: this.transferFacility,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true, // because operation is not on user
			// 		requiresChildren: [
			// 			{
			// 				organization: ["ORG_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"facility", "userEmail"
			// 		],
			// 		"tags": [
			// 			"facility-controller"
			// 		],
			// 		"summary": "transferFacility",
			// 		"requestBody": {
			// 			"required": true,
			// 			"content": {
			// 				"application/json": {
			// 					"schema": {
			// 						"properties": {
			// 							"facilityId": { type: "string", required: true },
			// 							"email": { type: "string", required: true },
			// 							"organizationName": { type: "string", required: true },
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
			// 			}, {
			// 				"name": "saveByEmail",
			// 				"in": "query",
			// 				"description": "Use email to identify user",
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
			// 	}
			// },
			"api/facility": {
				'POST': {
					func: this.saveFacility,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"facility-controller"
					],
					ensureExists: [
						"organization"
					],
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						},
						// {
						// 	facility: ["ORG_ADMIN"]
						// },

					],
					"summary": "saveFacility",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"organizationId": { "type": "string", required: true },
										"facilityName": { type: "string", required: true },
										"center": { type: "string", required: true },
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
			"api/facility?facilityId": {
				'DELETE': {
					func: this.deleteFacility,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"],
							facility: ["FACILITY_ADMIN", "FACILITY_ADMIN"]
						},
						// {
						// 	facility: ["FACILITY_ADMIN"]
						// },

					],
					ensureExists: [
						"facility"
					],
					"tags": [
						"facility-controller"
					],
					"summary": "deleteFacility",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
					func: this.getFacility,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					// requiresChildren: [
					// 	{
					// 		// facility: ["FACILITY_ADMIN", "FACILITY_ADMIN"]
					// 	},
					// ],
					ensureExists: [
						"facility"
					],
					"tags": [
						"facility-controller"
					],
					"summary": "getSingleFacility",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
					func: this.patchFacility,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"],
							facility: ["FACILITY_ADMIN", "FACILITY_ADMIN"]
						},
					],
					ensureExists: [
						"facility"
					],
					"tags": [
						"facility-controller"
					],
					"summary": "editFacility",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
										"facilityName": { type: "string", required: true },
										"center": { type: "string", required: true },
										"facilityName": { type: "string", required: true },
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
			"api/facility/transfer": {
				'POST': {
					func: this.transferFacility,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					requiresChildren: [
						{
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility", "userEmail"
					],
					"tags": [
						"facility-controller"
					],
					"summary": "transfer facility to a different User",
					// "requestBody": {
					// 	"required": true,
					// 	"content": {
					// 		"application/json": {
					// 			"schema": {
					// 				"properties": {
					// 					"userId": { "type": "string", required: true },
					// 					"facilityName": { type: "string", required: true },
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
										"email": { "type": "string", required: true },
										"organizationName": { "type": "string", required: true },
										"facilityId": { type: "string", required: true },
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


			// "api/facility/facility?facilityId": {
			// 	'POST': {
			// 		func: this.transferFacility,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true,
			// 		requiresChildren: [
			// 			{
			// 				facility: ["FACILITY_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"facility"
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
			"api/facility/user": {
				'POST': {
					func: this.saveFacilityUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true, // because operation is not on user
					requiresChildren: [
						{
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility", "user"
					],
					"tags": [
						"facility-user-controller"
					],
					"summary": "saveFacilityUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"facilityId": { type: "string", required: true },
										"userId": { type: "string", required: true },
										"authority": { type: "string", required: true, enum: ["FACILITY_ADMIN", "FACILITY_USER"] },
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
				// 	func: this.editFacilityUser,
				// 	requiresLogin: true,
				// 	requiresAdmin: false,
				// 	doForAnother: true,
				// 	requiresChildren: [
				// 		{
				// 			facility: ["FACILITY_ADMIN"]
				// 		}
				// 	],
				// 	ensureExists: [
				// 		"facility", "user"
				// 	],
				// 	"tags": [
				// 		"facility-user-controller"
				// 	],
				// 	"summary": "editFacilityUser",
				// 	"requestBody": {
				// 		"required": true,
				// 		"content": {
				// 			"application/json": {
				// 				"schema": {
				// 					"properties": {
				// 						"facilityId": { type: "string", required: true },
				// 						"userId": { type: "string", required: true },
				// 						"authority": { type: "string", required: true, enum: ["FACILITY_ADMIN", "FACILITY_USER"] },
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
			"api/facility/user?saveByEmail": {
				'POST': {
					func: this.saveFacilityUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true, // because operation is not on user
					requiresChildren: [
						{
							organization: ["ORG_ADMIN", "OR_THIS_ONE"],
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility", "userEmail"
					],
					"tags": [
						"facility-user-controller"
					],
					"summary": "saveFacilityUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"facilityId": { type: "string", required: true },
										"email": { type: "string", required: true },
										"authority": { type: "string", required: true, enum: ["FACILITY_ADMIN", "FACILITY_USER"] },
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
			"api/facility/user?facilityId&userId": {
				'DELETE': {
					func: this.deleteFacilityUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					doForSelf: false,
					requiresChildren: [
						{
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility", "user"
					],
					"tags": [
						"facility-user-controller"
					],
					"summary": "deleteFacilityUser",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
			"api/facility/user/authority?facilityId&userId&authority": {
				'DELETE': {
					func: this.deleteFacilityUserAuthority,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					doForSelf: false,
					requiresChildren: [
						{
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility", "user"
					],
					"tags": [
						"facility-user-controller"
					],
					"summary": "deleteFacilityUserAuthority",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
							enum: ["FACILITY_ADMIN", "FACILITY_USER"]
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
			// "api/facility/users?facilityId": {
			// 	'GET': {
			// 		func: this.getFacilityUsers,
			// 		requiresLogin: true,
			// 		requiresAdmin: false,
			// 		doForAnother: true,
			// 		requiresChildren: [
			// 			{
			// 				facility: ["FACILITY_ADMIN"]
			// 			}
			// 		],
			// 		ensureExists: [
			// 			"facility"
			// 		],
			// 		"tags": [
			// 			"facility-user-controller"
			// 		],
			// 		"summary": "getFacilityUsers",
			// 		"parameters": [
			// 			{
			// 				"name": "X-Authorization",
			// 				"in": "header",
			// 				"description": "bearer token",
			// 				"required": true,
			// 				"type": "string"
			// 			},
			// 			{
			// 				"name": "facilityId",
			// 				"in": "query",
			// 				"description": "facilityId",
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
			"api/facility/users?facilityId&authority&filters": {
				'GET': {
					func: this.getFacilityUsers,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: true,
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"],
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility"
					],
					"tags": [
						"facility-user-controller"
					],
					"summary": "getFacilityUsers",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
							"required": true,
							"type": "string"
						},
						{
							"name": "authority",
							"in": "query",
							"description": "authority",
							"required": false,
							"type": "string",
							"enum": ["FACILITY_ADMIN", "FACILITY_USER"]
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
			"api/facility/owner?facilityId": {
				'GET': {
					func: this.getFacilityOwner,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					requiresChildren: [
						{
							facility: ["FACILITY_ADMIN"]
						}
					],
					ensureExists: [
						"facility"
					],
					"tags": [
						"facility-controller"
					],
					"summary": "getFacilityOwner",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "facilityId",
							"in": "query",
							"description": "facilityId",
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
				"name": "facility-controller",
				"description": "Facility Controller"
			},
			{
				"name": "facility-controller",
				"description": "Facility Controller"
			},
			{
				"name": "facility-user-controller",
				"description": "Facility User Controller"
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