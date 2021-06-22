'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
const { Op } = require("sequelize");
const any = require('promise.any');

class helpers extends csystem {

	constructor(main) {
		super(main.config);
		this.main = main
	}

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}

	requireOrganization = async (authorities) => {
		return new Promise(async (resolve, reject) => {
			let { userId } = this.authenticatedUser
			let { organizationId, facilityId, organizationUserId, facilityUserId } = this.params


			const checkAuthority = async (authority) => {
				return new Promise(async (resolve, reject) => {
					let organizationWhere = {}
					if (organizationId) organizationWhere.organizationId = organizationId;
					let facilityWhere = {}
					if (facilityId) facilityWhere.facilityId = facilityId;

					let organizationUserWhere = { authority, userUserId: userId }
					if (organizationUserId) organizationUserWhere.organizationUserId = organizationUserId
					let facilityUserWhere = {}
					if (facilityUserId) {
						facilityUserWhere.facilityUserId = facilityUserId
					}
					// console.log({facilityUserId, facilityUserWhere})
					let associated = {
						include: [
							{
								model: this.sequelize.models.organizationUser,
								// attributes: ['organizationId', 'organizationName'],
								required: true,
								subQuery: false,
								where: organizationUserWhere
							},
							{
								model: this.sequelize.models.facilities,
								required: true,
								subQuery: false,
								where: facilityWhere,
								include: [
									{
										model: this.sequelize.models.facilityUser,
										required: true,
										// subQuery: false,
										where: facilityUserWhere
									}
								]
							},
						]
					};
					// console.log({associated, organizationWhere, facilityUserWhere, facilityWhere, organizationUserWhere})

					let [err, care] = await to(this.sequelize.models.organizations.findOne(Object.assign({ where: organizationWhere }, associated)))
					// console.log(care)
					// return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${organizationId || facilityId || organizationUserId}` })

					// let [err, care] = await to(this.sequelize.models.organizations.findOne({ where: { userUserId: userId, organizationOrganizationId: organizationId, authority } }))
					//  return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${organizationId}` })
					if (!care) {
						// if (!organizationId) {
						if (organizationUserId) {
							[err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { organizationUserId } }));
						}
						else if (facilityId) {
							[err, care] = await to(this.sequelize.models.facilities.findOne({ where: { facilityId } }));
						} else {
							if (facilityUserId) {
								associated = {
									include: [
										{
											model: this.sequelize.models.facilityUser,
											required: true,
											// subQuery: false,
											where: facilityUserWhere
										}
									]
								};
								[err, care] = await to(this.sequelize.models.facilities.findOne(Object.assign({ where: { facilityId } }, associated)));
							}
						}
						if (care) {
							if (care.dataValues.organizationId) organizationId = care.dataValues.organizationId
							if (care.dataValues.organizationOrganizationId) organizationId = care.dataValues.organizationOrganizationId
							if (care.dataValues.facilityUsers[0].organizationOrganizationId) organizationId = care.dataValues.organizationOrganizationId
						}
						if (organizationId) {
							;[err, care] = await to(this.sequelize.models.organizations.findOne({ where: { userUserId: userId, organizationId } }));
							if (!care)
								return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${organizationId || facilityId || organizationUserId}` })
							else resolve(care)
						}
						return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${organizationId || facilityId || organizationUserId || facilityUserId}` })
					}
					return resolve(care)
				});
			}
			let promises = authorities.map(checkAuthority);
			let [err, care] = await to(any(promises));
			let retError = err;
			try {
				retError = err.errors[0]
			} catch (error) { }
			if (err) return reject(retError)
			// if (err) return reject(err);
			return resolve(care)

			// if (organizationId) {
			// 	const checkAuthority = async (authority) => {
			// 		return new Promise(async (resolve, reject) => {
			// 			let [err, care] = await to(this.sequelize.models.organizationUser.findOne({ where: { userUserId: userId, organizationOrganizationId: organizationId, authority } }))
			// 			if (!care) return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${organizationId}` })
			// 			return resolve(care)
			// 		});
			// 	}
			// 	let promises = authorities.map(checkAuthority);
			// 	let [err, care] = await to(Promise.all(promises));
			// 	if (err) return reject(err);
			// 	return resolve(care)
			// }

			// if(facilityId){

			// }
		});
	}
	requireFacility = async (authorities) => {
		return new Promise(async (resolve, reject) => {
			let { userId } = this.authenticatedUser
			let { facilityId } = this.params

			const checkAuthority = async (authority) => {
				return new Promise(async (resolve, reject) => {
					let [err, care] = await to(this.sequelize.models.facilityUser.findOne({ where: { userUserId: userId, facilityFacilityId: facilityId, authority } }))
					if (!care) return reject({ status: '401', message: `You are not permitted to perform ${authority} operation on ${facilityId}` })
					return resolve(care)
				});
			}
			let promises = authorities.map(checkAuthority);
			let [err, care] = await to(Promise.all(promises));
			if (err) return reject(err);
			resolve(care)
		});
	}

	requireChild = async (child) => {
		return new Promise(async (resolve, reject) => {
			let rqType = Object.keys(child)[0]
			let authorities = child[rqType];
			let err, care
			switch (rqType) {
				case "organization":
					;[err, care] = await to(this.requireOrganization(authorities))
					if (err) return reject(err);
					return resolve(true)
					break;
				case "facility":
					;[err, care] = await to(this.requireFacility(authorities))
					if (err) return reject(err);
					return resolve(true)
					break;
				default:
					return resolve(true)
			}
		});
	}
	requireChildren = async (children) => {
		return new Promise(async (resolve, reject) => {
			children = children[0] || []
			let tmp = Object.keys(children)
			if (tmp.length === 0) return resolve(true)
			let tmpArr = [];
			tmp.map(key => {
				let tmpObj = {};
				tmpObj[key] = children[key]
				tmpArr.push(tmpObj)
			})
			children = tmpArr
			let promises = children.map(this.requireChild)
			let [err, care] = await to(any(promises))
			let retError = err;
			try {
				retError = err.errors[0]
			} catch (error) { }
			if (err) return reject(retError)
			resolve(true)
		});
	}
	/**
	 * Ensure that the values for the supplied fields exist 
	 * @param {Array} fields 
	 */
	ensureExists = async (fields) => {
		return new Promise(async (resolve, reject) => {
			let promises = fields.map(this.ensureFieldExists)
			let [err, care] = await to(Promise.all(promises))
			if (err) return reject(err)
			resolve(true)
		});
	}
	ensureFieldExists = async (field) => {
		return new Promise(async (resolve, reject) => {
			let filter
			let model
			let value
			let email = this.params.email
			email = (email || '').toLowerCase();
			switch (field) {
				case "organization":
					model = this.sequelize.models.organizations
					value = this.params.organizationId
					filter = { where: { organizationId: this.params.organizationId } }
					break;
				case "facility":
					model = this.sequelize.models.facilities
					value = this.params.facilityId
					filter = { where: { facilityId: this.params.facilityId } }
					break;
				case "user":
					model = this.sequelize.models.users
					value = this.params.userId
					filter = { where: { userId: this.params.userId } }
					break;
				case "userEmail":
					model = this.sequelize.models.users
					value = this.params.email
					filter = { where: { email: email } }
					break;
				case "drugCategory":
					model = this.sequelize.models.drugCategories
					value = this.params.drugCategoryId
					filter = { where: { drugCategoryId: this.params.drugCategoryId } }
					break;
				case "apiLevelOne":
					model = this.sequelize.models.apiLevelOne
					value = this.params.apiLevelOneId
					filter = { where: { apiLevelOneId: this.params.apiLevelOneId } }
					break;
				case "apiLevelTwo":
					model = this.sequelize.models.apiLevelTwo
					value = this.params.apiLevelTwoId
					filter = { where: { apiLevelTwoId: this.params.apiLevelTwoId } }
					break;
			}
			if (!model) return resolve(true)
			let [err, care] = await to(model.findOne(filter))
			if (err) return reject(err)
			if (!care) {
				return reject({ status: 422, message: `${field}:${value} does not exist` })
			}
			resolve(true)
		});
	}

	/**
	 * Check that there are other users with authority so that there is atleast one user with said authority
	 * @param {object} authorities 
	 */
	notLastAuthority = async (authorities) => {
		let wheres = [];
		let queries = []

		return new Promise(async (resolve, reject) => {
			authorities.map(authObj => {
				let model;
				for (let org in authObj) {
					let authorities = authObj[org];
					switch (org) {
						case 'system':
							model = this.sequelize.models.users
							wheres = [];
							authorities.map(authority => {
								wheres.push({
									authority,
									userId: { [Op.ne]: this.params.userId }
								})
							})
							for (let i in wheres) {
								queries.push({ model, where: wheres[i], alias: "system", authority: wheres[i].authority })
							}
							break;

					}
				}
			})
			queries.map(q => console.log(q.wheres))

			const queryDb = async (query) => {
				return new Promise(async (resolve1, reject1) => {
					let where = query.where
					let [err, care] = await to(query.model.findAll({ where }));
					console.log(err, care)
					if (err || !care || care.length === 0) {
						return reject1({ status: 422, message: `You can't delete the last ${query.authority} from ${query.alias}` })
					}
					resolve1();
				})
			}
			let promises = queries.map(queryDb);
			let [err, care] = await to(Promise.all(promises))
			if (err) return reject(err)
			resolve(true)
		});
	}

	/*
		ensure that entity being deleted does not records in other tables which need not be deleted
		Can't delete user while having organizations (for security) 
	 */
	ensureDoesntHave = async (fields) => {
		return new Promise(async (resolve, reject) => {
			let { userId } = this.params

			let associated = {};
			let includes = [];
			fields.map(field => {
				switch (field) {
					case "organization":
						includes.push({ model: this.sequelize.models.organizations, as: 'organization' })
						break;
					case "facility":
						includes.push({ model: this.sequelize.models.facilities, as: 'facilities' })
						break;
				}
			})
			// includes = includes.map(item => { return { model: item } })
			if (includes.length > 0) associated = {
				include: includes
			}
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)))
			let errors = [];
			try {
				includes.map(item => {
					let alias = item.as;
					if (care[alias]) {
						if (care[alias].dataValues) {
							errors.push(`Delete your ${alias} first.`)
						}
					}
				})
			} catch (error) { }
			let errorStr = errors.join(' ')
			if (errors.length > 0) return reject({ status: 422, message: errorStr })
			resolve(true)
		})
	}

	removeExpiredTokens = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.sequelize.models.logins.findAll({ where: { tokenExpiry: { [Op.lte]: (new Date().getTime()) / 1000 } } }))
			const removeToken = async (item) => {
				return new Promise(async (resolve1, reject1) => {
					await to(item.update({ token: '' }))
					resolve1()
				})
			}
			if (care) {
				let promises = care.map(removeToken);
				await to(Promise.all(promises));
			}
		})
	}
	/**
	 * check if requirements are met. From headers, query, body, and authorization & permissions(USER_AUTHORITY)
	 * @param {Object} req 
	 */
	processRequirements = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			this.removeExpiredTokens();
			let { func, requiresAdmin, doForAnother, requiresLogin, swaggerObject, requiresChildren, ensureExists, doForSelf, ensureDoesntHave, notLastAuthority } = this.pathExists(req)
			// console.log({ func, requiresAdmin, doForAnother, requiresLogin, swaggerObject })
			if (doForSelf === undefined) doForSelf = true;
			const validateType = (type, data, enum_ = false) => {
				if (data === undefined || data.length === 0) return true;
				if (enum_) {
					if (!enum_.includes(data)) throw `${data} not in [${enum_.toString()}]`
				}
				switch (type) {
					case "boolean":
						// return this.parseBool(data) === NaN ? false : true;
						return (this.parseBool(data) !== true && this.parseBool(data) !== false) ? false : true;
					case "number":
						// return data.toString().length === parseInt(data).toString().length && data.toString() === 
						return data.toString() === parseInt(data).toString();
					case "string":
						return true;
				}
			}
			// let inheaders, inBody, inQuery;
			/** check for required fields in headers and query */
			for (let i in swaggerObject.parameters) {
				let parameter = swaggerObject.parameters[i];
				let { name, required, type } = parameter;
				let enum_ = parameter.enum;
				let in_ = parameter.in
				let name_ = name
				let checkIn = {}
				let keys = []

				switch (in_) {
					case "header":
						checkIn = req.headers
						keys = Object.keys(checkIn).map(item => item.toLowerCase())
						break;
					case "query":
						checkIn = req.query
						keys = Object.keys(checkIn)
						break;
				}

				if (required) {
					// switch (in_) {
					// 	case "header":
					// 		checkIn = req.headers
					// 		keys = Object.keys(checkIn).map(item => item.toLowerCase())
					// 		break;
					// 	case "query":
					// 		checkIn = req.query
					// 		keys = Object.keys(checkIn)
					// 		break;
					// }
					// let keys = Object.keys(checkIn).map(item => item.toLowerCase())
					name_ = name;
					if (in_ === 'header') name_ = name.toLowerCase();
					if (!keys.includes(name_)) {
						return reject({ status: 422, message: `Missing ${name} in ${in_}`, keys, name_, tmp: req.headers })
					} else {
						if (!this.params) {
							this.params = {}
						}
						this.params[name] = checkIn[name]
					}
				} else {
					if (!this.params) {
						this.params = {}
					}
					this.params[name] = checkIn[name]
				}
				/**
				 * validate type
				 */
				// if (!validateType(type, checkIn[name_], enum_)) {
				// 	return reject({ status: 422, message: `${name}:${checkIn[name_]} not of type ${type}` })
				// }
				let typeIsValid = false
				try {
					// console.log(type, checkIn[name_].length, name_, name_)
					typeIsValid = validateType(type, checkIn[name_], enum_)
					if (!typeIsValid) return reject({ status: 422, message: `${name}:${checkIn[name_]} not of type ${type}` })
				} catch (error) {
					return reject({ status: 422, message: error })
				}
			}
			if (swaggerObject.requestBody) {
				let content = swaggerObject.requestBody.content
				let keys = Object.keys(req.body).map(item => item/*.toLowerCase()*/)
				for (let contentType in content) {
					let schema = content[contentType].schema || {};
					let properties = schema.properties || {}
					for (let param in properties) {
						let { type, required } = properties[param];
						let enum_ = properties[param].enum;
						let name_;
						name_ = param
						if (required) {
							name_ = param // .toLowerCase();
							if (!keys.includes(name_)) {
								return reject({ status: 422, message: `Missing ${param} in body` })
							}
						}
						if (!this.params) {
							this.params = {}
						}
						this.params[name_] = req.body[param]
						/**
						 * validate type
						 */
						let typeIsValid = false
						try {
							typeIsValid = validateType(type, req.body[name_], enum_)
							if (!typeIsValid) return reject({ status: 422, message: `${name_}:${req.body[name_]} not of type ${type}` })
						} catch (error) {
							console.log(error)
							return reject({ status: 422, message: error })
						}
						// if (!validateType(type, req.body[name_])) {
						// 	return reject({ status: 422, message: `${name_}:${req.body[name_]} not of type ${type}` })
						// }
					}
				}
			}

			if (!func) {
				return reject({ code: 404, message: "Path not allowed" })
			}
			let err, care, user, userId;
			let isSysAdmin;
			;[err, care] = await to(this.isAuthenticated(req, res, next))
			if (requiresLogin) {
				if (err) return reject(err);
			}
			if (care) {
				user = care;
				req.authenticatedUser = user
				this.authenticatedUser = user
				userId = user.userId;
				;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
				user = care.dataValues;
				isSysAdmin = user.authority === 'SYS_ADMIN' ? true : false
				req.isSysAdmin = isSysAdmin
			}

			if (requiresLogin) {


				if (requiresAdmin) {
					if (!isSysAdmin) {
						return reject({ status: 401, message: `You don't have permission to perform SYS_ADMIN operation` })
					}
				}
				if (!doForAnother) {
					let anotherUserId = req.body.userId || req.query.userId;
					if (anotherUserId) {
						if (anotherUserId !== userId && !isSysAdmin) {
							return reject({ status: 401, message: `You don't have permission to perform operation on another user` })
						}
					}
				}

				if (!doForSelf) {
					let anotherUserId = req.body.userId || req.query.userId;
					if (anotherUserId) {
						if (anotherUserId === userId && !isSysAdmin) {
							return reject({ status: 401, message: `You don't have permission to perform operation on yourself` })
						}
					}
				}

			}

			if (ensureExists) {
				;[err, care] = await to(this.ensureExists(ensureExists))
				if (err) return reject(err);
			}
			// if (requiresChildren) {
				if (requiresChildren && !isSysAdmin) {
				;[err, care] = await to(this.requireChildren(requiresChildren))
				if (err) return reject(err);
			}

			if (ensureDoesntHave) {
				;[err, care] = await to(this.ensureDoesntHave(ensureDoesntHave))
				if (err) return reject(err);
			}
			if (notLastAuthority) {
				;[err, care] = await to(this.notLastAuthority(notLastAuthority))
				if (err) return reject(err);
			}
			// resolve({ care, requiresAdmin, doForAnother, requiresLogin })
			resolve({ func })
		});
	}


}

module.exports = helpers