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

	/**
	 * List all facilities or all organization facilities
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	listFacilities = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId } = req.query;
			let where = {};
			let whereMain = {};
			if (organizationId !== undefined) where.organizationOrganizationId = organizationId
			// if (userId !== undefined) whereMain.userId = userId
			// let associated = {
			// 	include: [
			// 		{
			// 			model: this.sequelize.models.organizations,
			// 			attributes: ['organizationId', 'organizationName'],
			// 			required: true,
			// 			subQuery: false,
			// 			where,
			// 			// include:
			// 			// 	[
			// 			// 		{
			// 			// 			model: this.sequelize.models.facilities,
			// 			// 			required: true,
			// 			// 			subQuery: false,
			// 			// 			attributes: ['facilityId', 'facilityName', 'location'],
			// 			// 			// where
			// 			// 		},
			// 			// 	]
			// 		}
			// 	]
			// };
			// let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], }, associated)));
			// if (err || !care || care.length === 0) {
			// 	associated = {
			// 		include: [
			// 			{
			// 				model: this.sequelize.models.facilityUser,
			// 				required: true,
			// 				subQuery: false,
			// 				include:
			// 					[
			// 						{
			// 							model: this.sequelize.models.facilities,
			// 							required: true,
			// 							subQuery: false,
			// 							attributes: ['facilityId', 'facilityName', 'location'],
			// 							where
			// 						},
			// 					]
			// 			}
			// 		]
			// 	};
			let [err, care] = await to(this.sequelize.models.facilities.findAll(Object.assign({ where: whereMain, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'], })));
			// }
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

module.exports = authority