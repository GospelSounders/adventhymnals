'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const {sequelize} = require(__dirname+"/../../csystem").models
// const Familyfe = require(__dirname+'/../../../modules/node-familyfe')(sequelize)
let sequelize, Familyfe;


class users extends csystem {

	constructor(config) {
		super(config);
	}

	// removeSomeFields(care) {
	// 	let ret = { ...care.dataValues || care }
	// 	ret = JSON.parse(JSON.stringify(ret, (k, v) => (k === 'Cpassword' || k === 'Password' || k === 'emailuid') ? undefined : v))
	// 	return ret;
	// }

	// async register(req, res, next) {
	// 	let self = this;
	// 	let [err, dontcare, care] = [];
	// 	self.makeMePrivate(req)	//make this *private
	// 	let person = req.body
	// 		;[err, care] = await to(Familyfe.Person.beget(person))
	// 	if (err) return Promise.reject(err)
	// 	// let {uid, Name, Email, IsActive} = care.dataValues || care
	// 	// res.json({uid:uid, Name: Name, Email: Email, Active: IsActive})
	// 	let ret = self.removeSomeFields(care);
	// 	res.json(ret)
	// }

	// async listUsers(req, res, next) {
	// 	let self = this;
	// 	let [err, dontcare, care] = [];
	// 	self.makeMePrivate(req)	//make this *private

	// 	let uid = req.params.v1
	// 	console.log(req.params)
	// 	if (uid !== undefined) [err, care] = await to(Familyfe.Person.which({ "uid": uid }))
	// 	else[err, care] = await to(Familyfe.World.parade())
	// 	if (err) return Promise.reject(err)
	// 	let ret = self.removeSomeFields(care);
	// 	res.json(ret)
	// 	// res.send(care)
	// }

	// async patchUser(req, res, next)	//not implemented
	// {
	// 	throw ({ message: "Method not allowed.", status: 405 })
	// }

	// async putUser(req, res, next) {
	// 	let self = this;
	// 	let [err, dontcare, care] = [];
	// 	self.makeMePrivate(req)	//make this *private
	// 		;[err, care] = await to(self.common(req, res, "update", next))
	// 	if (err) return Promise.reject(err)
	// 	return true;
	// }

	// async dropUser(req, res, next) {
	// 	let self = this;
	// 	let [err, dontcare, care] = [];
	// 	self.makeMePrivate(req)	//make this *private
	// 		;[err, care] = await to(self.common(req, res, "destroy", next))
	// 	if (err) return Promise.reject(err)
	// 	return true;
	// }

	// async common(req, res, action, next) {
	// 	let self = this;
	// 	let [err, dontcare, care] = [];
	// 	self.makeMePrivate(req)	//make this *private
	// 	let uid = req.params.v1
	// 	if (uid === undefined) return Promise.reject({ status: 422, message: "uid is required" })
	// 	let person = req.body
	// 	person.uid = uid;
	// 	if (action === "destroy")
	// 		[err, care] = await to(Familyfe.Person.destroy(person))
	// 	if (action === "update")
	// 		[err, care] = await to(Familyfe.Person.update(person))
	// 	if (err) return Promise.reject(err)
	// 		;[err, care] = await to(Familyfe.Person.which({ "uid": uid }))
	// 	if (err) return Promise.reject(err)
	// 	let ret = self.removeSomeFields(care);
	// 	res.json(ret)
	// 	return true
	// }

	// getAllFuncs() {
	// 	var props = [], toCheck;
	// 	var obj = toCheck = this;
	// 	do {
	// 		props = props.concat(Object.getOwnPropertyNames(obj));
	// 	} while (obj = Object.getPrototypeOf(obj));

	// 	return props.sort().filter(function (e, i, arr) {
	// 		if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
	// 	});
	// }

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}
	/*
	 * use this to 
	 *	1. register
	 *	2. list users
	 *	3. update users
	 *	4. delete users
	 *	
	 */

	patchUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.isAuthenticated(req, res, next))
			if (err) return reject(err)
			let body = Object.assign({}, req.body);
			let isAuthenticated, isSysAdmin
			isAuthenticated = care;
			if (body.authority === 'SYS_ADMIN' || (body.userId && body.userId !== isAuthenticated.userId)) {
				[err, care] = await to(this.isSysAdmin(isAuthenticated))
				if (!err) isSysAdmin = care
			}
			if (body.authority === 'SYS_ADMIN') {
				if (!isSysAdmin) { // request to create SYS_ADMIN has not been made by a SYS_ADMIN
					return reject({ status: 422, message: 'You don\'t have permission to create a SYS_ADMIN' })
				}
			}
			let userId = isAuthenticated.userId
			if (body.userId) userId = body.userId;
			let selectedUser;
			;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
			if (err || !care)selectedUser=false;
			else selectedUser = care
			/**
			 * Only a SYS_ADMIN can modify other accounts
			 */
			if (body.userId) {
				/** check that user exists */
				// userId = body.userId;
				// ;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
				
				// if (err || !care) return reject({ status: 422, message: `${userId} not found` })
				if (!selectedUser) return reject({ status: 422, message: `${userId} not found` })
				/** trying to patch other user's account */
				if (body.userId !== isAuthenticated.userId) {
					if (!isSysAdmin) { // request to create SYS_ADMIN has not been made by a SYS_ADMIN
						return reject({ status: 422, message: 'You don\'t have permission to modify another user\'s account' })
					}
				}
			}

			/** fields that cannot be modified at all*/
			if (body.email) delete body.email;
			if (body.createdAt) delete body.createdAt;
			if (body.updatedAt) delete body.updatedAt;
			// if (body.updatedAt) delete body.updatedAt;
			if (body.userId) delete body.userId;
			if (body.isActive) delete body.isActive;

			/** fields that cannot be modified by self */
			if(userId === isAuthenticated.userId){
				if (body.authority) delete body.authority;
			}
			/** fields that can only be modified by SYS_ADMIN */
			if(!isSysAdmin){
				if (body.authority) delete body.authority;
				if (body.enabled) delete body.enabled;
			}

			

			if(body.enabled) body.enabled = this.parseBool(body.enabled)

			;[err, care] = await to(selectedUser.update(body))
			if(err){
				let tmpErr = err + ''
				if (tmpErr.match(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/)) {
					tmpErr.replace(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/, (match, p1, p2, p3, p4, p5, offset, string) => {
						let ret = `Incorrect ${p1} value: '${p2}' for  ${p5}`
						tmpErr = ret
						return ret
					})
				} else {
					if (tmpErr.match(/Data truncated for column '(.*)'/)) {
						tmpErr.replace(/Data truncated for column '(.*)'/, (match, p1, p2, p3, p4, p5, offset, string) => {
							let ret = `Data truncated for ${p1}`
							tmpErr = ret
							return ret
						})
					}
				}
				return reject({status: 422, message:tmpErr})
			}
			resolve({care:care, body, enabled: typeof body.enabled});

		})
	}
	getUserById = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let userId = req.query.userId
			let [err, care] = await to(this.isAuthenticated(req, res, next))
			if (err) return reject(err)
			let isAuthenticated, isSysAdmin
			isAuthenticated = care;
			;[err, care] = await to(this.isSysAdmin(isAuthenticated))
			if (!err) isSysAdmin = care
			if ((userId !== isAuthenticated.userId && !isSysAdmin)) {
				return reject({ status: 422, message: 'You don\'t have permission to view another user' })
			}
			;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
			if (err) return reject(err)
			if (!care) reject({ status: 422, message: `${userId} not found` })
			resolve(care)
		})
	}
	getLoggedInUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.isAuthenticated(req, res, next))
			if (err) return reject(err)
			let isAuthenticated, isSysAdmin
			isAuthenticated = care;
			let userId = isAuthenticated.userId
				;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
			if (err) return reject(err)
			resolve(care)
		})
	}

	saveUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let sendActivationMail = req.query.sendActivationMail
			let body = req.body;
			let tmp = {
				// "additionalInfo": '{}',
				// "email": "surgbc@gamil54.com",
				// "authority": "SYS_USER",
				// "firstName": "Brian",
				// "lastName": "Odhiambo",
				// "gender": "Male",
				// "isActive": 'false',				// activateUsingActivationCode... What can the systemAdmin do and what can only other users do???
				// "dateOfBirth": "1980-06-17"
			}
			tmp.additionalInfo = req.body.additionalInfo
			tmp.email = req.body.email
			tmp.authority = req.body.authority
			tmp.firstName = req.body.firstName
			tmp.lastName = req.body.lastName
			tmp.dateOfBirth = req.body.dateOfBirth
			/**
			 * first user to be created in the system is a systemAdmin
			 * Only system admin can thereafter create other systemAdmin
			 * On creating user, he is inactive. Has to get code to activate.
			 * User can be deactivated by the systemAdmin...............
			 */
			let isAuthenticated, isSysAdmin
			if (tmp.authority === 'SYS_ADMIN') {
				let [err, care] = await to(this.isAuthenticated(req, res, next))
				if (!err) {
					isAuthenticated = care;
					[err, care] = await to(this.isSysAdmin(isAuthenticated))
					if (!err) isSysAdmin = care
				}
				if (!isSysAdmin) { // request to create SYS_ADMIN has not been made by a SYS_ADMIN
					return reject(err)
					tmp.authority === 'SYS_USER'
				}
			}
			if (tmp.authority !== 'SYS_ADMIN') {
				/**
				 * check how many users exist and put SYS_ADMIN if not no user exists yet
				 */
				let [err, care] = await to(this.hasSYS_ADMIN())
				if (err || !care) tmp.authority = 'SYS_ADMIN' // first user is a SYS_ADMIN
			}
			tmp.isActive = false
			let associated = {
				include:
					[
						{ model: this.sequelize.models.activationCode },
					]
			}
			let [err, care] = await to(this.sequelize.models.users.create(tmp, associated));
			let errors = {};
			if (err) {
				if (err.errors) {
					for (let i in err.errors) {
						console.log(err.errors[i].message)
						let tmpMsg = err.errors[i].message
						tmpMsg = tmpMsg.replace(/([0-9a-zA-Z]+).([0-9a-zA-Z]+ cannot be null)(.*)/, '$2$3')
						// console.log(tmpMsg)
						errors[err.errors[i].path] = tmpMsg
					}
					return reject({ "message": JSON.stringify(errors), status: 422 });
				}
				let tmpErr = err + ''
				if (tmpErr.match(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/)) {
					tmpErr.replace(/Incorrect ([0-9a-zA-Z]+) value: '([0-9a-zA-Z ]+)' for column `([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`.`([0-9a-zA-Z]+)`/, (match, p1, p2, p3, p4, p5, offset, string) => {
						let ret = `Incorrect ${p1} value: '${p2}' for  ${p5}`
						tmpErr = ret
						return ret
					})
				} else {
					if (tmpErr.match(/Data truncated for column '(.*)'/)) {
						tmpErr.replace(/Data truncated for column '(.*)'/, (match, p1, p2, p3, p4, p5, offset, string) => {
							let ret = `Data truncated for ${p1}`
							tmpErr = ret
							return ret
						})
					}
				}
				return reject({ "message": tmpErr, status: 422 });
			}

			let createdUser = care.dataValues
			resolve(createdUser);
			let userId = care.userId;
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
				await this.sendActivationMail(createdUser.email)
			}
		})
	}


	// listAllUsers = async (where) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let [err, care] = await to(this.sequelize.models.users.findAll())
	// 		console.log(err)
	// 		return resolve(care)
	// 	})
	// }
	hasSYS_ADMIN = async () => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.sequelize.models.users.findOne({ where: { authority: 'SYS_ADMIN' } }))
			if (err || !care) return resolve(false);
			return resolve(care.dataValues)
		})
	}

	fetchActivationCode = async (email) => {
		return new Promise(async (resolve, reject) => {
			email = email.toLowerCase();
			let associated = {
				include:
					[
						{ model: this.sequelize.models.activationCode },
					]
			}
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { email } }, associated)));
			if (!care.activationCode) {
				[err, care] = await to(this.sequelize.models.activationCode.create({ code: '', userUserId: care.dataValues.userId }));
				;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { email } }, associated)));
			}
			await to(care.activationCode.update({ code: care.activationCode.dataValues.codeId }))
			if (err || !care) return resolve({});
			return resolve({ code: care.activationCode.dataValues.codeId })
		})
	}

	sendActivationMail = async (email) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.fetchActivationCode(email))
			let activationCode = care.code
			let accountActivation = require(path.join(__dirname, '../../../', 'emailTemplates/accountActivation'))

			let config = this.config
			accountActivation = accountActivation.replace(/{{system}}/g, config.extras.site.title)
				.replace(/{{api}}/g, config.extras.scheme + '://' + config.extras.domain)
				.replace(/{{token}}/g, activationCode)
				.replace(/{{logo_url}}/g, config.extras.logo)
				.replace(/{{copyright_name}}/g, config.extras.copyright.name)
				.replace(/{{site}}/g, config.extras.copyright.url)

				;[err, care] = await to(this.sendEmail({
					subject: `${config.extras.site.title} Account Activation`,
					to: email,
					fromName: `Accounts`,
					html: accountActivation,
				}))
			resolve(care || {})
		})
	}



	/** Set path for it */
	// activateUser = (req) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let code = req.query.activateToken;
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.activationCode,
	// 						where: { code }
	// 					},
	// 				]
	// 		}
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			Object.assign({}, associated))
	// 		);
	// 		if (!care) {
	// 			return reject({ code: 409, message: "Account had been activated" })
	// 		}
	// 		let userId = care.dataValues.userId;
	// 		await to(this.sequelize.models.users.update({ isActive: true }, { where: { userId } }))
	// 		await to(care.activationCode.destroy())
	// 			;[err, care] = await to(this.createPasswordCode(userId))
	// 		resolve(care)

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

	// createPassword = async (req) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let { passwordToken, password } = req.body;
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.passwordCode,
	// 						where: { code: passwordToken }
	// 					},
	// 				]
	// 		};
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			Object.assign({}, associated))
	// 		);
	// 		if (!care) {
	// 			return reject({ code: 422, message: `Not Account found matching ${passwordToken}` })
	// 		}
	// 		let passwordCode = care.passwordCode
	// 		let userId = care.dataValues.userId
	// 			;[err, care] = await to(this.hashPassword(password))
	// 		let hashedPassword = care
	// 		associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.password,
	// 					},
	// 				]
	// 		};
	// 		[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		if (!care.password) {
	// 			await to(this.sequelize.models.password.create({ userUserId: userId, password: hashedPassword }))
	// 		}
	// 		else {
	// 			[err, care] = await to(care.password.update({ password: hashedPassword }))
	// 		}
	// 		resolve()
	// 		await to(passwordCode.destroy())
	// 		return;

	// 	})
	// }
	// getPasswordResetCode = async (req, res, next) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let { sendActivationMail, email } = req.query;
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			{ where: { email } }
	// 		));
	// 		if (!care) {
	// 			return reject({ code: 422, message: `${email} not found` })
	// 		}
	// 		let userId = care.dataValues.userId;
	// 		;[err, care] = await to(this.createPasswordCode(userId))
	// 		let code = care.code;
	// 		resolve({ passwordToken: code })
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
	// 			let config = this.config
	// 			let accountActivation = require(path.join(__dirname, '../../../', 'emailTemplates/resetPassword'))
	// 			accountActivation = accountActivation.replace(/{{system}}/g, config.extras.site.title)
	// 				.replace(/{{api}}/g, config.extras.scheme + '://' + config.extras.domain)
	// 				.replace(/{{token}}/g, code)
	// 				.replace(/{{logo_url}}/g, config.extras.logo)
	// 				.replace(/{{copyright_name}}/g, config.extras.copyright.name)
	// 				.replace(/{{site}}/g, config.extras.copyright.url)

	// 				;[err, care] = await to(this.sendEmail({
	// 					subject: `${config.extras.site.title} Reset Password`,
	// 					to: email,
	// 					fromName: `Accounts`,
	// 					html: accountActivation,
	// 				}))
	// 		}
	// 	})
	// }

	functionsMap = () => {
		return {
			"api/user?sendActivationMail": {
				'POST': {
					func: this.saveUser,
					"tags": [
						"user-controller"
					],
					"summary": "saveUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"userId": {
											"type": { type: "string" }
										},
										"additionalInfo": { type: "string" },
										"authority": { type: "string", enum: ["SYS_ADMIN","SYS_USER"] }, // enum
										"createdTime": 0,
										"email": { type: "string" },
										"firstName": { type: "string" },
										"lastName": { type: "string" },
										"isActive": { type: "boolean" },
										"gender": { type: "string", enum: ["Male","Female"] },
										"dateOfBirth": { type: "string" },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "sendActivationMail",
							"in": "query",
							"description": "Send Activation Email",
							"required": false,
							"type": "boolean",
							"default": true
						}, {
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": false,
							"type": "string"
						}
					]
					,
					// "securitySchemes": {
					// 	"BearerAuth": {
					// 		"type": "http",
					// 		"scheme": "bearer"
					// 	}
					// },
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
			"api/user?userId": {
				'GET': {
					func: this.getUserById,
					"tags": [
						"user-controller"
					],
					"summary": "getUserById",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
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
			"api/user/me": {
				'GET': {
					func: this.getLoggedInUser,
					"tags": [
						"user-controller"
					],
					"summary": "getLoggedInUser",
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
			"api/user": {
				'PATCH': {
					func: this.patchUser,
					"tags": [
						"user-controller"
					],
					"summary": "editUser",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"userId": {
											"type": { type: "string" }
										},
										"additionalInfo": { type: "string" },
										"authority": { type: "string", enum: ["SYS_ADMIN","SYS_USER"] }, // enum
										"createdTime": 0,
										"email": { type: "string" },
										"firstName": { type: "string" },
										"lastName": { type: "string" },
										"isActive": { type: "boolean" },
										"gender": { type: "string", enum: ["Male","Female"] },
										"dateOfBirth": { type: "string" },
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
					]
					,
					// "securitySchemes": {
					// 	"BearerAuth": {
					// 		"type": "http",
					// 		"scheme": "bearer"
					// 	}
					// },
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
			}
		}
	}

	tagsMap = () => {
		return [
			{
				"name": "user-controller",
				"description": "User Controller"
			}, {
				"name": "auth-controller",
				"description": "Auth Controller"
			},
		]
	}

	async main(req, res, next) {
		return new Promise(async (resolve, reject) => {
			// let func = this.pathExists(req)
			let {func, requiresAdmin, doForAnother} =  this.pathExists(req)
			if (!func) {
				return reject({ code: 404, message: "Path not allowed" })
			}
			let [err, care] = await to(func(req, res, next));
			if (err) {
				return reject(err)
			}
			res.send(care)
		})
	}


}

module.exports = users