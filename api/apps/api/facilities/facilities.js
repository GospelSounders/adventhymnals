'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
const helpers_ = require('../helpers').helpers

let helpers;
let sequelize, Familyfe;


class facilities extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}

	/**
	 * List all facilities or all organization facilities
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	listFacilities = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId, userId } = req.query;
			let where = {};
			let whereMain = {};
			if (organizationId !== undefined) where.organizationOrganizationId = organizationId
			// let [err, care] = await to(this.sequelize.models.facilities.findAll({ attributes: ['facilityId', 'facilityName'] }))

			if (userId !== undefined) whereMain.userId = userId
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
									where
								},
							]
					}
				]
			};
			// let associated = {
			// 	include: [
			// 		{
			// 			model: this.sequelize.models.organizations,
			// 			include:
			// 				[
			// 					{
			// 						model: this.sequelize.models.facilities,
			// 						where
			// 					},
			// 				]
			// 		}
			// 	]
			// };
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], }, associated)));
			// console.log(err)
			// console.log(care);
			// return
			// let [err, care] = await to(this.sequelize.models.facilities.findAll({ where }))
			// if (err) return reject(err)
			// let ret = [];
			// care.map(item => ret.push(item.dataValues))
			// console.log(care)
			// resolve(ret);
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
							
							// tmp.authority = userData.authority

							// tmp.facilityName = item.facilityName
							// tmp.facilityId = item.facilityId
							// tmp.facilityId = item.facilityId
							// item.organizationId = item.organizationOrganizationId
							// delete item.userUserId
							// delete item.organizationOrganizationId
							// item.email = item0.email
							// item.firstName = item0.firstName
							// item.lastName = item0.lastName
							ret.push(tmp)
							return item
						}
					)
					// item.userId = item.userUserId
					// item.organizationId = item.organizationOrganizationId
					// delete item.userUserId
					// delete item.organizationOrganizationId
					// item.email = item0.email
					// item.firstName = item0.firstName
					// item.lastName = item0.lastName
					// ret.push(item)
					
				})
			})

			// userData.facilities.map(item => {
			// 	item = item.dataValues || item
			// 	item.userId = item.userUserId
			// 	item.organizationId = item.organizationOrganizationId
			// 	delete item.userUserId
			// 	delete item.organizationOrganizationId
			// 	item.email = item0.email
			// 	item.firstName = item0.firstName
			// 	item.lastName = item0.lastName
			// 	ret.push(item)
			// 	return item
			// })

			// console.log(ret)
			resolve(ret);
		})
	}


	functionsMap = () => {
		return {
			"api/facilities?organizationId": {
				'GET': {
					func: this.listFacilities,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					ensureExists: [
						"organization"
					],
					requiresChildren: [
						{
							organization: ["ORG_ADMIN"]
						}
					],
					"tags": [
						"facilities-controller"
					],
					"summary": "listFacilities",
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
				}
			},
			"api/facilities?userId": {
				'GET': {
					func: this.listFacilities,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					ensureExists: [
						"user"
					],
					"tags": [
						"facilities-controller"
					],
					"summary": "listFacilities",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
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
				}
			},
			"api/facilities": {
				'GET': {
					func: this.listFacilities,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"facilities-controller"
					],
					"summary": "listAllFacilities",
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
				}
			},
		}
	}

	tagsMap = () => {
		return [
			{
				"name": "facilities-controller",
				"description": "Facilities Controller"
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

module.exports = facilities