'use strict'

// const { resolve, reject, filter } = require('bluebird');
// const { hash } = require('bcrypt');
const jwt_decode = require("jwt-decode").default;
const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const { Op } = require("sequelize");
// const etc = require('node-etc')
// const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// let sequelize;
const helpers_ = require('../helpers').helpers
let helpers;


class auth extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	logout_ = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let token = (req.headers.Authorization || req.headers.authorization || req.headers["X-Authorization"] || req.headers["x-authorization"] || req.query["x-authorization"] || '').split(" ").slice(-1)[0]
			let [err, care] = await to(this.sequelize.models.logins.findOne({ where: { token } }))
			if (care) {
				care.update({ token: '' })
			}
			resolve()
		})
	}

	login_ = async (req, res, next) => { // for some unknown reason login fails
		return new Promise(async (resolve, reject) => {
			let body = req.body;
			//comparePassword
			let { email, password } = body
			email = email.toLowerCase();
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.password,
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { email } }, associated)));
			if (!care) {
				return reject({ status: 401, message: "Wrong email or password" })
			}
			if (!care.dataValues.enabled) {
				return reject({ status: 401, message: `Account belonging to ${email} is disabled` })
			}
			if (!care.dataValues.isActive) {
				return reject({ status: 401, message: `Account belonging to ${email} has not been activated` })
			}
			let user = care.dataValues
			let hash = care.password.dataValues.password
				;[err, care] = await to(this.comparePassword(password, hash))
			if (!care) {
				return reject({ status: 401, message: "Wrong email or password" })
			}
			// createToken
			let tmpUser = {};
			for (let i in user) {
				if ('object' !== typeof user[i]) {
					tmpUser[i] = user[i]
				}
			}
			let { userId, authority, firstName, lastName } = user;
			tmpUser = Object.assign({}, { userId, email, authority, firstName, lastName })
			let token = this.createToken(tmpUser);
			let decoded = jwt_decode(token);
			let tokenExpiry = decoded.exp;
			let { browser, os, platform } = req.useragent;
			let ip = (req.headers['x-forwarded-for'] || req.ip).split(':').slice(-1)[0];
			if (!ip.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]/)) ip = "127.0.0.1"
				;[err, care] = await to(this.sequelize.models.logins.create({ userUserId: userId, logins: new Date(), browser, os, platform, ip, token, tokenExpiry }));
			return resolve({ token })
		})
	}

	changePassword_ = async (req, res, next) => { // for some unknown reason login fails
		return new Promise(async (resolve, reject) => {
			let { password, oldpassword } = req.body;
			let [err, care] = await to(this.isAuthenticated(req, res, next))
			if (err) return reject(err);
			let userId = care.userId;
			;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }));
			if (err) return reject(err);
			let email = care.dataValues.email;
			email = email.toLowerCase();
			let tmpReq = {
				body: { email, password: oldpassword }
			}
				;[err, care] = await to(this.login_(tmpReq, res, next));
			if (err) return reject({ status: 422, message: "wrong password" });
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.password,
							// where: { code: passwordToken }
						},
					]
			};
			;[err, care] = await to(this.sequelize.models.users.findOne(
				Object.assign({ where: { userId } }, associated))
			);
			let passwordObj = care.password
				;[err, care] = await to(this.hashPassword(password))
			let hashedPassword = care;
			;[err, care] = await to(passwordObj.update({ password: hashedPassword }))
			return resolve()
		})
	}

	refreshToken_ = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { userId, authority, firstName, lastName, email } = req.authenticatedUser;
			email = email.toLowerCase();
			let tmpUser = Object.assign({}, { userId, email, authority, firstName, lastName })
			let currentToken = (req.headers.Authorization || req.headers.authorization || req.headers["X-Authorization"] || req.headers["x-authorization"] || '').split(" ").slice(-1)[0]
			let [err, care] = await to(this.sequelize.models.logins.findOne({ where: { currentToken } }));
			let token = this.createToken(tmpUser);
			let decoded = jwt_decode(currentToken);
			let tokenExpiry = decoded.exp;
			let now = parseInt(new Date().getTime() / 1000);
			if (tokenExpiry - now < 5 * 60) {
				care.update({ token, tokenExpiry })
			} else token = currentToken
			return resolve({ token })
		})
	}

	logins_ = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let filters = {};
			try {
				filters = JSON.parse(req.query.filters)
			} catch (error) { }

			if (!req.isSysAdmin) {
				if (!filters.userId) filters.userUserId = req.authenticatedUser.userId
			}
			if (filters.userId) {
				filters.userUserId = filters.userId
				delete filters.userId
			}
			for (let i in filters) {
				let item = filters[i];
				if (typeof item === 'object') {
					let tmp = {}
					for (let j in item) {
						let key = j
						let val = item[j];
						tmp[Op[key]] = val
					}
					filters[i] = tmp
				}
			}
			let where = filters;
			// 
			// let [err, care] = await to(this.sequelize.models.logins.findAll({ where }))
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.logins,
							where
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({}, associated)));
			// console.log(care)
			// resolve({})
			// let [err, care] = await to(this.sequelize.models.users.findAll({ where }))
			if (err) return reject(err)
			let ret = [];
			care.map(item => care.dataValues)
			care.map(item0 => {
				item0.logins.map(item => {
					item = item.dataValues || item
					item.userId = item.userUserId
					delete item.userUserId
					item.refreshedAt = item.updatedAt
					delete item.updatedAt
					item.email = item0.email
					ret.push(item)
					return item
				})
			})

			// care.map(item => ret.push(item.dataValues))
			// ret = ret.map(item => {
			// 	item.userId = item.userUserId
			// 	delete item.userUserId
			// 	item.refreshedAt = item.updatedAt
			// 	delete item.updatedAt
			// 	return item
			// })
			resolve(ret);
		})
	}

	functionsMap = () => {
		return {
			"api/auth/logins?filters": {
				'GET': {
					func: this.logins_,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "logins",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
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
				}
			},
			"api/auth/login": {
				'POST': {
					func: this.login_, // for some unknown reason login fails. because it is a method of parent
					requiresLogin: false,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "login",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"email": { type: "string" },
										"password": { type: "string" },
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
				}
			},
			"api/auth/changePassword": {
				'POST': {
					func: this.changePassword_,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "changePassword",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"oldpassword": { type: "string" },
										"password": { type: "string" }
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
				}
			},
			"api/auth/logout?x-authorization": {
				'GET': {
					func: this.logout_,
					requiresLogin: false,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "logout",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": false,
							"type": "string"
						},
						{
							"name": "x-authorization",
							"in": "query",
							"description": "token",
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
				}
			},
			"api/auth/token": {
				'GET': {
					func: this.refreshToken_,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "getToken",
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
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
					]
				}
			},
			// "api/auth/logout": {
			// 	'GET': {
			// 		func: this.logout_, // for some unknown reason login fails
			// 		"tags": [
			// 			"auth-controller"
			// 		],
			// 		"summary": "logout",
			// 		"responses": {
			// 			"200": {
			// 				"description": "OK",
			// 				"content": {
			// 					"application/json": {
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
			// 		]
			// 	}
			// },

		}
	}

	tagsMap = () => {
		return [
			{
				"name": "user-controller",
				"description": "User Controller"
			}
		]
	}

	async main(req, res, next) {
		return new Promise(async (resolve, reject) => {
			// // let func = this.pathExists(req)
			// let { func, requiresAdmin, doForAnother } = this.pathExists(req)
			// if (!func) {
			// 	return reject({ code: 404, message: "Path not allowed" })
			// }
			// let [err, care] = await to(func(req, res, next));
			// if (err) {
			// 	return reject(err)
			// }
			// res.send(care)
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

module.exports = auth
