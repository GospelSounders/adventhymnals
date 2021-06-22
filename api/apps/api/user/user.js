'use strict'

// const { resolve, reject } = require('bluebird');
const jwt_decode = require("jwt-decode").default;
const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const {sequelize} = require(__dirname+"/../../csystem").models
// const Familyfe = require(__dirname+'/../../../modules/node-familyfe')(sequelize)
// let sequelize, Familyfe;

const helpers_ = require('../helpers').helpers
let helpers;


class users extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
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
			if (err || !care) selectedUser = false;
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
			if (userId === isAuthenticated.userId) {
				if (body.authority) delete body.authority;
			}
			/** fields that can only be modified by SYS_ADMIN */
			if (!isSysAdmin) {
				if (body.authority) delete body.authority;
				if (body.enabled) delete body.enabled;
			}

			if (body.enabled) body.enabled = this.parseBool(body.enabled);
			if (body.additionalInfo && typeof body.additionalInfo === 'object') {
				body.additionalInfo = JSON.stringify(body.additionalInfo)
			}

			;[err, care] = await to(selectedUser.update(body))
			if (err) {
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
				return reject({ status: 422, message: tmpErr })
			}

			let associated = {
				include:
					[
						{ model: this.sequelize.models.logins },
					]
			};
			// ;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId }, }))
			;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
			let ret = {};
			ret = care.dataValues;
			ret.additionalInfo = {
				lastLoginTs: ret.logins.slice(-1)[0].logins
			}
			delete ret.logins
			resolve(ret)
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

	deleteUserById = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let userId = req.query.userId
			let [err, care] = await to(this.sequelize.models.users.destroy({ where: { userId } }))
			if (err) reject({ status: 422, message: err })
			resolve()
		})
	}
	getOrganizationFromId = async (organization) => {
		return new Promise(async (resolve, reject) => {
			let { organizationId } = organization
			let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { organizationId } }))
			if (err) reject({ status: 422, message: err })
			let { organizationName } = care.dataValues
			resolve({ organizationName, organizationId })
		})
	}

	getLoggedInUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.isAuthenticated(req, res, next))
			if (err) return reject(err)
			let isAuthenticated, isSysAdmin
			isAuthenticated = care;
			let userId = isAuthenticated.userId;
			let associated = {
				include:
					[
						{ model: this.sequelize.models.logins },
						{ model: this.sequelize.models.organizationUser }
					]
			};
			// ;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId }, }))
			;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
			let ret = {};
			ret = care.dataValues;
			ret.additionalInfo = {
				lastLoginTs: ret.logins.slice(-1)[0].logins
			}
			let organizationUsers = JSON.parse(JSON.stringify(ret.organizationUsers));
			organizationUsers = organizationUsers.map(itemTmp => {
				let item = itemTmp.dataValues || itemTmp
				delete item.createdAt
				delete item.updatedAt
				item.userId = item.userUserId
				item.organizationId = item.organizationOrganizationId
				delete item.userUserId
				delete item.organizationOrganizationId
				return item;
			})
			ret.organizations = organizationUsers
			delete ret.organizationUsers
			delete ret.logins

			if (err) return reject(err)
			let promises = ret.organizations.map(this.getOrganizationFromId);
			;[err, care] = await to(Promise.all(promises));
			care.map(item => {
				let { organizationName, organizationId } = item;
				for (let i in ret.organizations) {
					if (ret.organizations[i].organizationId === organizationId) {
						ret.organizations[i].organizationName = organizationName
					}
				}
			})
			resolve(ret)
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

			// console.log(tmpsendActivationMail)
			await to(this.fetchActivationCode(createdUser.email))
			if (sendActivationMail) {
				await this.sendActivationMail(createdUser.email, req.body.activationPage)
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
			email = email.toLowerCase()
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

	sendActivationMail = async (email, activationPage = false) => {

		return new Promise(async (resolve, reject) => {
			if (typeof email !== "string") {
				let req = email;
				let { userId } = req.body
				let [err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }));
				email = care.dataValues.email
			}
			let [err, care] = await to(this.fetchActivationCode(email))
			let activationCode = care.code
			if (activationPage) {
				activationCode += `.</strong><br/> You can use <a href="${activationPage}?activateToken=${care.code}">this link</a> to activate`
			}
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


	listUserOrganizations = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let userId = req.query.userId
			let [err, care] = await to(this.sequelize.models.organizations.findAll({ where: { userUserId: userId }, attributes: ['organizationId', 'organizationName'] }))
			if (err) return reject(err)
			let ret = [];
			care.map(item => ret.push(item.dataValues));

			// organizations where user has roles
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizationUser,
							where: { userUserId: userId },
							required: true,
							// subQuery: false,
						},
					]
			};
			;[err, care] = await to(this.sequelize.models.organizations.findAll(Object.assign({}, associated)))
			care.map(item => {
				item = item.dataValues
				delete item.organizationUsers
				ret.push(item)
			});

			let filteredRet = {};
			ret.map(item => {
				filteredRet[item.organizationId] = item
			})
			ret = [];
			for (let i in filteredRet) {
				ret.push(filteredRet[i])
			}
			resolve(ret);
		})
	}

	listUserFacilities = async (req, res, next) => {
		/**
		 * List from facilityUser
		 * List from Org_Authority
		 */
		return new Promise(async (resolve, reject) => {
			let userId = req.query.userId
			/**
			 * member of organization having facility
			 */
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.organizations,
							attributes: ['organizationId', 'organizationName'],
							required: true,
							subQuery: false,

							include:
								[
									{
										model: this.sequelize.models.organizationUser,
										where: { userUserId: userId },
										required: true,
										// subQuery: false,
									},
									{
										model: this.sequelize.models.facilities,
										required: true,
										// subQuery: false,
									},
								]
						}
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: {}, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'] }, associated)))
			// let [err, care] = await to(this.sequelize.models.organizations.findAll(Object.assign({ where: { userUserId: userId }, attributes: ['organizationId', 'organizationName'] }, associated)))
			if (err) return reject(err)
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
							// console.log({tmp})
							ret.push(tmp)
							return item
						}
					)
				})
			})
			/**
			 * owner of organization having facility
			 */
			associated = {
				include:
					[
						{
							model: this.sequelize.models.organizations,
							attributes: ['organizationId', 'organizationName'],
							required: true,
							subQuery: false,
							where: { userUserId: userId },
							include:
								[
									{
										model: this.sequelize.models.organizationUser,
										required: true,
										// subQuery: false,
									},
									{
										model: this.sequelize.models.facilities,
										required: true,
										// subQuery: false,
									},
								]
						}
					]
			};
			;[err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: {}, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'] }, associated)))
			// let [err, care] = await to(this.sequelize.models.organizations.findAll(Object.assign({ where: { userUserId: userId }, attributes: ['organizationId', 'organizationName'] }, associated)))
			// console.log(care)
			if (err) return reject(err)
			// ret = [];
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
							// console.log({tmp})
							ret.push(tmp)
							return item
						}
					)
				})
			})
			/**
			 * member of facility
			 */
			associated = {
				include:
					[
						{
							model: this.sequelize.models.organizations,
							attributes: ['organizationId', 'organizationName'],
							required: true,
							subQuery: false,
							// where: { userUserId: userId },
							include:
								[
									{
										model: this.sequelize.models.organizationUser,
										required: true,
										// subQuery: false,
									},
									{
										model: this.sequelize.models.facilities,
										required: true,
										subQuery: false,
										include: [
											{
												model: this.sequelize.models.facilityUser,
												// attributes: ['organizationId', 'organizationName'],
												required: true,
												// subQuery: false,
												where: { userUserId: userId },
											}
										]
									},
								]
						}
					]
			};
			;[err, care] = await to(this.sequelize.models.users.findAll(Object.assign({ where: {}, attributes: ['userId', 'email', 'firstName', 'lastName', 'authority'] }, associated)))
			if (err) return reject(err)
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
							// console.log({tmp})
							ret.push(tmp)
							return item
						}
					)
				})
			})
			let filteredRet = {};
			ret.map(item => {
				filteredRet[item.facilityId] = item
			})
			ret = [];
			for (let i in filteredRet) {
				ret.push(filteredRet[i])
			}
			resolve(ret);
		})
	}

	/**
	 * Log in as User
	 * User must be active and enabled
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	loginasUser = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let userId = req.query.userId
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, {})));
			let { email } = care.dataValues
			email = email.toLowerCase()
			if (!care.dataValues.enabled) {
				return reject({ status: 401, message: `Account belonging to ${email} has been disabled.` })
			}
			if (!care.dataValues.isActive) {
				return reject({ status: 401, message: `Account belonging to ${email} has not been activated.` })
			}
			let user = care.dataValues
			let tmpUser = {};
			for (let i in user) {
				if ('object' !== typeof user[i]) {
					tmpUser[i] = user[i]
				}
			}
			let { authority, firstName, lastName } = user;
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

	functionsMap = () => {
		return {
			"api/user?sendActivationMail": {
				'POST': {
					func: this.saveUser,
					requiresLogin: false,
					requiresAdmin: false,
					doForAnother: false,
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
										"userId": { type: "string" },
										"additionalInfo": { type: "string" },
										"authority": { type: "string", enum: ["SYS_ADMIN", "SYS_USER"] }, // enum
										"email": { type: "string" },
										"firstName": { type: "string" },
										"lastName": { type: "string" },
										"isActive": { type: "boolean" },
										"gender": { type: "string", enum: ["Male", "Female"] },
										"dateOfBirth": { type: "string" },
										"activationPage": { type: "string", required: false },
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
			"api/user/token?userId": {
				'GET': {
					func: this.loginasUser,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"user-controller"
					],
					ensureExists: [
						"user"
					],
					"summary": "loginasUser",
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
				}
			},
			"api/user/activationEmail": {
				'POST': {
					func: this.sendActivationMail,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"user-controller"
					],
					ensureExists: [
						"user"
					],
					"summary": "sendActivationEmail",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
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
										"userId": {
											"type": "string"
										},
										"userId": { type: "string", required: true },
										"activationPage": { type: "string", required: true },
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
			"api/user?userId": {
				'GET': {
					func: this.getUserById,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"user-controller"
					],
					ensureExists: [
						"user"
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
				'DELETE': {
					func: this.deleteUserById,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"user-controller"
					],
					ensureExists: [
						"user"
					],
					ensureDoesntHave: [
						"organization"
					],
					notLastAuthority: [
						{ system: ["SYS_ADMIN"] },
						{ organization: ["ORG_ADMIN"] },
					],
					"summary": "deleteUserById",
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
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
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
			"api/user/organizations?userId": {
				'GET': {
					func: this.listUserOrganizations,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"organizations-controller"
					],
					"summary": "listUserOrganizations",
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
						},
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
			"api/user/facilities?userId": {
				'GET': {
					func: this.listUserFacilities,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"facilities-controller"
					],
					"summary": "listUserFacilities",
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
						},
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
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
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
											"type": "string"
										},
										"additionalInfo": { type: "string" },
										"authority": { type: "string", enum: ["SYS_ADMIN", "SYS_USER"] }, // enum
										"createdTime": 0,
										"email": { type: "string" },
										"firstName": { type: "string" },
										"lastName": { type: "string" },
										"isActive": { type: "boolean" },
										"gender": { type: "string", enum: ["Male", "Female"] },
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

module.exports = users
