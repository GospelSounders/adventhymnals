'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// let sequelize;
const helpers_ = require('../helpers').helpers
let helpers;



class noauth extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	/** Set path for it */
	activateUser = (req) => {
		return new Promise(async (resolve, reject) => {
			let code = req.query.activateToken;
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.activationCode,
							where: { code }
						},
					]
			}
			let [err, care] = await to(this.sequelize.models.users.findOne(
				Object.assign({}, associated))
			);
			if (!care) {
				return reject({ code: 409, message: "Account had been activated" })
			}
			let userId = care.dataValues.userId;
			await to(this.sequelize.models.users.update({ isActive: true }, { where: { userId } }))
			await to(care.activationCode.destroy())
				;[err, care] = await to(this.createPasswordCode(userId))
			resolve({ passwordToken: care.code })

		})
	}

	createPassword = async (req) => {
		return new Promise(async (resolve, reject) => {
			let { passwordToken, password } = req.body;
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.passwordCode,
							where: { code: passwordToken }
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findOne(
				Object.assign({}, associated))
			);
			if (!care) {
				return reject({ code: 422, message: `Account not found matching ${passwordToken}` })
			}
			let passwordCode = care.passwordCode
			let userId = care.dataValues.userId
				;[err, care] = await to(this.hashPassword(password))
			let hashedPassword = care
			associated = {
				include:
					[
						{
							model: this.sequelize.models.password,
						},
					]
			};
			[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
			if (!care.password) {
				await to(this.sequelize.models.password.create({ userUserId: userId, password: hashedPassword }))
			}
			else {
				[err, care] = await to(care.password.update({ password: hashedPassword }))
			}
			resolve()
			await to(passwordCode.destroy())
			return;

		})
	}

	createPasswordCode = async (userId) => {
		return new Promise(async (resolve, reject) => {
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.passwordCode,
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
			if (!care.passwordCode) {
				await to(this.sequelize.models.passwordCode.create({ userUserId: userId, code: '' }))
					;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
			}
			await to(care.passwordCode.update({ code: care.passwordCode.dataValues.codeId }))
			resolve({ code: care.passwordCode.dataValues.codeId })
		})
	}

	getActivationCode = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let userId = req.query;
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.activationCode,
						},
					]
			}
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: userId }, associated)));
			if(!care.activationCode){
				return reject({ code: 409, message: "Account had been activated" })
			}
			let activationCode = care.activationCode.code;
			resolve({activationCode})
		})
	}

	getPasswordResetCode = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { sendActivationMail, email } = req.query;
			email = email.toLowerCase()
			let [err, care] = await to(this.sequelize.models.users.findOne(
				{ where: { email } }
			));
			if (!care) {
				return reject({ code: 422, message: `${email} not found` })
			}
			let userId = care.dataValues.userId;
			;[err, care] = await to(this.createPasswordCode(userId))
			let code = care.code;
			resolve({ passwordToken: code })
			let tmpsendActivationMail = sendActivationMail
			switch (tmpsendActivationMail) {
				case true:
					sendActivationMail = true;
					break;
				case false:
					sendActivationMail = false;
					break;
				case "true":
					sendActivationMail = true;
					break;
				case "false":
					sendActivationMail = false;
					break;
				default:
					sendActivationMail = true;
			}
			if (sendActivationMail) {
				let config = this.config
				let accountActivation = require(path.join(__dirname, '../../../', 'emailTemplates/resetPassword'))
				accountActivation = accountActivation.replace(/{{system}}/g, config.extras.site.title)
					.replace(/{{api}}/g, config.extras.scheme + '://' + config.extras.domain)
					.replace(/{{token}}/g, code)
					.replace(/{{logo_url}}/g, config.extras.logo)
					.replace(/{{copyright_name}}/g, config.extras.copyright.name)
					.replace(/{{site}}/g, config.extras.copyright.url)

					;[err, care] = await to(this.sendEmail({
						subject: `${config.extras.site.title} Reset Password`,
						to: email,
						fromName: `Accounts`,
						html: accountActivation,
					}))
			}
		})
	}

	// login = async (req, res, next) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let sendActivationMail = req.query.sendActivationMail
	// 		console.log(sendActivationMail)
	// 		let body = req.body;
	// 		console.log(body)
	// 		console.log('SAVNG.................', req.body)
	// 		// console.log(this.sequelize)		
	// 		let tmp = {
	// 			// "additionalInfo": '{}',
	// 			// "email": "surgbc@gamil54.com",
	// 			// "authority": "SYS_USER",
	// 			// "firstName": "Brian",
	// 			// "lastName": "Odhiambo",
	// 			// "gender": "Male",
	// 			// "isActive": 'false',				// activateUsingActivationCode... What can the systemAdmin do and what can only other users do???
	// 			// "dateOfBirth": "1980-06-17"
	// 		}
	// 		tmp.additionalInfo = req.body.additionalInfo
	// 		tmp.email = req.body.email
	// 		tmp.authority = req.body.authority
	// 		tmp.firstName = req.body.firstName
	// 		tmp.lastName = req.body.lastName
	// 		tmp.dateOfBirth = req.body.dateOfBirth
	// 		/**
	// 		 * first user to be created in the system is a systemAdmin
	// 		 * Only system admin can thereafter create other systemAdmin
	// 		 * On creating user, he is inactive. Has to get code to activate.
	// 		 * User can be deactivated by the systemAdmin...............
	// 		 */
	// 		let isAuthenticated, isSysAdmin
	// 		if (tmp.authority === 'SYS_ADMIN') {
	// 			let [err, care] = await to(this.isAuthenticated(req, res, next))
	// 			console.log(err)
	// 			console.log(care)
	// 			if (!err) {
	// 				isAuthenticated = care;
	// 				[err, care] = await to(this.isSysAdmin(req, res, next))
	// 				if (!err) isSysAdmin = care
	// 			}
	// 			if (!isSysAdmin) { // request to create SYS_ADMIN has not been made by a SYS_ADMIN
	// 				tmp.authority === 'SYS_USER'
	// 			}
	// 		}
	// 		if (tmp.authority !== 'SYS_ADMIN') {
	// 			/**
	// 			 * check how many users exist and put SYS_ADMIN if not no user exists yet
	// 			 */
	// 			let [err, care] = await to(this.hasSYS_ADMIN())
	// 			if (err || !care) tmp.authority = 'SYS_ADMIN' // first user is a SYS_ADMIN
	// 		}
	// 		tmp.isActive = false
	// 		// tmp.activationCode = {
	// 		// 	code: '..'
	// 		// }
	// 		console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
	// 		console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
	// 		console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
	// 		console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
	// 		let associated = {
	// 			include:
	// 				[
	// 					{ model: this.sequelize.models.activationCode },
	// 				]
	// 		}
	// 		console.log(tmp)
	// 		let [err, care] = await to(this.sequelize.models.users.create(tmp, associated));
	// 		let errors = {};
	// 		if (err) {
	// 			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
	// 			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
	// 			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
	// 			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
	// 			if (err.errors) {
	// 				for (let i in err.errors) {
	// 					console.log(err.errors[i].message)
	// 					let tmpMsg = err.errors[i].message
	// 					tmpMsg = tmpMsg.replace(/([0-9a-zA-Z]+).([0-9a-zA-Z]+ cannot be null)(.*)/, '$2$3')
	// 					console.log(tmpMsg)
	// 					errors[err.errors[i].path] = tmpMsg
	// 				}
	// 				return reject({ "message": JSON.stringify(errors), status: 422 });
	// 			}
	// 			let tmpErr = err + ''
	// 			if (tmpErr.match(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/)) {
	// 				tmpErr.replace(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/, (match, p1, p2, p3, p4, p5, offset, string) => {
	// 					let ret = `Incorrect ${p1} value: '${p2}' for  ${p5}`
	// 					tmpErr = ret
	// 					return ret
	// 				})
	// 			} else {
	// 				if (tmpErr.match(/Data truncated for column '(.*)'/)) {
	// 					tmpErr.replace(/Data truncated for column '(.*)'/, (match, p1, p2, p3, p4, p5, offset, string) => {
	// 						let ret = `Data truncated for ${p1}`
	// 						tmpErr = ret
	// 						return ret
	// 					})
	// 				}
	// 			}
	// 			// console.log(tmpErr.match(/([0-9a-zA-Z]+).([0-9a-zA-Z]+) cannot be null/g))
	// 			// tmpErr = tmpErr.replace(/([0-9a-zA-Z]+).([0-9a-zA-Z]+) cannot be null/g,(match, p1, p2, offset, string) => {
	// 			// 	// let ret = `Data truncated for ${p1}`
	// 			// 	// tmpErr = ret
	// 			// 	// return ret
	// 			// 	console.log("|||||||||||||||||||||||||||||||||||")
	// 			// 	console.log("|||||||||||||||||||||||||||||||||||")
	// 			// 	console.log("|||||||||||||||||||||||||||||||||||")
	// 			// 	console.log(match)
	// 			// 	console.log(p1)
	// 			// 	console.log(p2)
	// 			// 	console.log(string)
	// 			// })			
	// 			return reject({ "message": tmpErr, status: 422 });
	// 		}

	// 		let createdUser = care.dataValues
	// 		let userId = care.userId;
	// 		let tmpsendActivationMail = sendActivationMail
	// 		switch (tmpsendActivationMail) {
	// 			case true:
	// 				sendActivationMail = true;
	// 				break;
	// 			case false:
	// 				sendActivationMail = false;
	// 				break;
	// 			case "true":
	// 				sendActivationMail = true;
	// 				break;
	// 			case "false":
	// 				sendActivationMail = false;
	// 				break;
	// 			default:
	// 				sendActivationMail = true;
	// 		}

	// 		if (sendActivationMail) {
	// 			await this.sendActivationMail(createdUser.email)
	// 		}

	// 		// let sendActivationMail = req.query.sendActivationMail

	// 		// sendCode???


	// 		/**
	// 		 * Create activation code
	// 		 */
	// 		// [err, care] = await to(this.createActivationCode(userId))


	// 		// for(let i in err.errors){
	// 		// 	// console.log(i,err.errors[i] )
	// 		// 	errors[err.errors[i].path] = err.errors[i].message
	// 		// }
	// 		// console.log(errors)
	// 		// if(err)return reject({"message": JSON.stringify(errors), status:422});
	// 		// resolve(care)


	// 		// return resolve(createdUser);
	// 		return resolve({ createdUser, sendActivationMail, type: typeof sendActivationMail });
	// 	})
	// }


	// createPasswordCode = async (userId) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.passwordCode,
	// 					},
	// 				]
	// 		};
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		if (!care.passwordCode) {
	// 			await to(this.sequelize.models.passwordCode.create({ userUserId: userId, code: '' }))
	// 				;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		}
	// 		await to(care.passwordCode.update({ code: care.passwordCode.dataValues.codeId }))
	// 		resolve({ code: care.passwordCode.dataValues.codeId })
	// 	})
	// }





	functionsMap = () => {
		return {
			"api/noauth/activate?activateToken": {
				'GET': {
					func: this.activateUser,
					"tags": [
						"auth-controller"
					],
					"summary": "activateUser",
					"parameters": [
						{
							"name": "activateToken",
							"in": "query",
							"description": "Activate User",
							"required": true,
							"type": "string"
						}
					]
					,
					"responses": {
						"200": {
							"description": "OK"
						}
					}
				}
			},
			"api/noauth/activationCode?userId": {
				'GET': {
					func: this.getActivationCode,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"auth-controller"
					],
					"summary": "getActivationCode",
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
					]
					,
					"responses": {
						"200": {
							"description": "OK"
						}
					}
				}
			},
			"api/noauth/resetPassword": {
				'POST': {
					func: this.createPassword,
					"tags": [
						"auth-controller"
					],
					"summary": "createOrResetPassword",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"passwordToken": { "type": "string", required: true },
										"password": { type: "string", required: true },
									}
								}
							}
						}
					},
					"parameters": []
					,
					"responses": {
						"200": {
							"description": "OK"
						}
					}
				},
			},
			"api/noauth/resetPassword?email&sendActivationMail": {
				'GET': {
					func: this.getPasswordResetCode,
					"tags": [
						"auth-controller"
					],
					"summary": "getPasswordResetCode",
					"parameters": [
						{
							"name": "email",
							"in": "query",
							"description": "Your email account",
							"required": true,
							"type": "string"
						}, {
							"name": "sendActivationMail",
							"in": "query",
							"description": "Send Activation Email to User",
							"required": true,
							"type": "boolean",
							"default": true
						}
					]
					,
					"responses": {
						"200": {
							"description": "OK"
						}
					}
				}
			}
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
			// let func = this.pathExists(req)
			// if (!func) {
			// 	return reject({ code: 404, message: "Path not allowed"})
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
new noauth()
module.exports = noauth