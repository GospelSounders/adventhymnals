'use strict'

let sequelize;
const to = require('await-to-js').to,
	sentenceCase = require('sentence-case'),
	passport = require('passport'),
	JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	fse = require('fs-extra'),
	passportConfig = require(__dirname + '/../../config/config.passport.js'),
	nodemailer = require("nodemailer"),
	bcrypt = require('bcrypt')


class Csystem {
	sequelize = null;
	constructor(config) {
		try {
			sequelize = require(__dirname + '/models')(config)
			this.sequelize = sequelize;
			let force = false //|| config.database.force || false;
			this.sequelize.sequelize.sync({ force: force }).then(response => {}).catch(error => console.log(error))
		} catch (error) {
			// console.log(error)
		}
		this.config = config;

		try {
			let transporterOptions = {
				host: config.mailer.host,
				port: parseInt(config.mailer.port) || 587,
				// secure: (config.mailer.secure === 'true' || config.mailer.secure === true) ? true : false,
				secureConnection: false,
				auth: config.mailer.auth,
				tls: {
					ciphers:'SSLv3'
				}
			}
			this.transporterOptions = transporterOptions
			this.transporter = nodemailer.createTransport(transporterOptions);
		} catch (error) { }
		// ;[err, dontcare] = await to(sequelize.sync({force:force}))
	}

	async hashPassword(plainTextPassword) {
		return new Promise((resolve, reject) => {
			const saltRounds = 10;
			bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
				if (err) return reject(err);
				return resolve(hash)
			});
		});
	}

	async comparePassword(plainTextPassword, hash) {
		return new Promise((resolve, reject) => {
			const saltRounds = 10;
			bcrypt.compare(plainTextPassword, hash, function (err, result) {
				if (err) return reject(err);
				if (!result) return reject(err);
				return resolve(hash)
			});
		});
	}

	createToken(user) {
		return passport.generateToken(user, this.config.extras.tokenSecret);
	}
	/**
	 * 
	 * @param {Object} options 
	 * @param {string} options.from
	 * @param {string} options.to
	 * @param {string} options.subject
	 * @param {string} options.text
	 * @param {string} options.html
	 */
	async sendEmail(options) {
		return new Promise((resolve, reject) => {
			if (!options.from) options.from = options.fromName ? `${options.fromName} <${this.config.mailer.auth.user}>` : this.config.mailer.auth.user
			if (!options.to) options.to = options.from
			this.transporter.sendMail(options, (error, info) => {
				if (error) return reject(error)
				return resolve(info)
			})
		})
	}

	async dbSync(force = false) {
		let [err, dontcare] = []
			;[err, dontcare] = await to(sequelize.sync({ force: force }))
		if (err) {
			console.log(err)
			return Promise.reject(new Error(err.name));
		}
		return true;
	}

	async setup(req, res) {
		// let self = this;
		// self.req = req;
		// self.res = res;
		// self.setappfromurl();
		// self.init(req, res, function(err, results){
		// 	Apps.padlock(self.user, self.app,  self.req.params.method, self.req.method)
		// 	self.defaultpage = Apps.Attributes.defaultpage
		// 	self.json = Apps.Attributes.json
		// 	self.status = Apps.Attributes.status
		// 	console.log(`SET WITH ${self.defaultpage}, ${self.app}, ${self.req.params.method}`)
		// 	if(self.defaultpage === false)return callback("Disallowed");
		// 	callback()
		// });
		return true;
	}

	pathExists(req) {
		let method = req.method
		let pathStr = this.pathStr(req)
		let funcMap;
		try {
			funcMap = this.functionsMap()
		} catch (error) {
			funcMap = this.main.functionsMap()
		}
		let ensureDoesntHave = false, notLastAuthority= false, ensureExists = false, func = false, requiresAdmin = false, doForAnother = false, requiresLogin = false, requiresChildren = false, doForSelf = false, swaggerObject;

		try {
			func = funcMap[pathStr][method].func
			requiresAdmin = funcMap[pathStr][method].requiresAdmin
			doForAnother = funcMap[pathStr][method].doForAnother
			requiresLogin = funcMap[pathStr][method].requiresLogin
			requiresChildren = funcMap[pathStr][method].requiresChildren
			ensureExists = funcMap[pathStr][method].ensureExists
			doForSelf = funcMap[pathStr][method].doForSelf
			ensureDoesntHave = funcMap[pathStr][method].ensureDoesntHave
			notLastAuthority = funcMap[pathStr][method].notLastAuthority
			swaggerObject = funcMap[pathStr][method]
		} catch (error) {
			try {
				let pathParams = [pathStr.split("?")[0]].concat([(pathStr.split("?")[1]||'').split('&')]);
				// pathParams  = pathParams.concat(pathStr.split("?")[1].split('&'));
				for (let funcPath in funcMap) {
					try {
						/** different order in query vars from order in funcMap */
						if (funcMap[funcPath][method]) {
							let funcPathParams = [funcPath.split("?")[0]].concat([(funcPath.split("?")[1]||'').split('&')]);
							try{
								funcPathParams = [funcPath.split("?")[0]].concat([(funcPath.split("?")[1]).split('&')]);
							}catch(error){}
							// let funcPathParams = [funcPath.split("?")[0]].concat([(funcPath.split("?")[1]).split('&')]);
							// let funcPathParams_ = [funcPath.split("?")[0]].concat([(funcPath.split("?")[1]||'').split('&')]);
							if (funcPathParams[0] === pathParams[0]) {
								pathParams[1] = pathParams[1].filter(item=>item!=='')
								let isRequiredPath = pathParams[1].every(item => funcPathParams[1].includes(item));
								if (isRequiredPath) {
									func = funcMap[funcPath][method].func
									requiresAdmin = funcMap[funcPath][method].requiresAdmin
									doForAnother = funcMap[funcPath][method].doForAnother
									requiresLogin = funcMap[funcPath][method].requiresLogin
									requiresChildren = funcMap[funcPath][method].requiresChildren
									ensureExists = funcMap[funcPath][method].ensureExists
									doForSelf = funcMap[funcPath][method].doForSelf
									ensureDoesntHave = funcMap[funcPath][method].ensureDoesntHave
									notLastAuthority = funcMap[funcPath][method].notLastAuthority
									swaggerObject = funcMap[funcPath][method]
								}
								// console.log({func})
							}
						}
					} catch (error) { }
				}
			} catch (error) { }

			// console.log(error)
		}
		return { func, requiresAdmin, doForAnother, requiresLogin, swaggerObject, requiresChildren, ensureExists, doForSelf, ensureDoesntHave, notLastAuthority}
	}

	pathStr(req) {
		let pathStr = '';
		let reqParams = [];
		for (let i in req.params) {
			if (req.params[i]) reqParams.push(req.params[i])
		}
		pathStr = reqParams.join('/')
		let reqQuery = []
		for (let i in req.query) {
			reqQuery.push(i)
		}
		pathStr += (reqQuery.length > 0 ? '?' : '')
		pathStr += reqQuery.join('&')
		return pathStr
	}

	isMethodAllowed(req, methods) {
		if (methods.includes(req.method) === false) throw ({ message: "Method not allowed", status: 405 })
		return true;
	}

	makeMePrivate(req) {
		let self = this;
		self.isMethodAllowed(req, [0])
	}

	trimReq(req) {
		return { method: 0, params: req.params, body: req.body }
	}

	sentenceCase(params) {
		let ret = {}
		for (let i in params) ret[sentenceCase(i.toLowerCase())] = params[i]
		return ret
	}

	parseBool(bool) {
		if (typeof bool === 'boolean') return bool;
		if (typeof bool === 'number') return !!bool
		if (typeof bool === 'string') bool = bool.toLocaleLowerCase();
		switch (bool) {
			case "true":
				return true;
			case "false":
				return false;
		}
		return NaN;
	}

	async isAuthenticated(req, res, next) {
		if (req.headers["X-Authorization"]) req.headers.Authorization = req.headers["X-Authorization"]
		if (req.headers["x-authorization"]) req.headers.authorization = req.headers["x-authorization"]
		let opts = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: this.config.extras.tokenSecret
		}
		// console.log(opts)
		passport.use(new JwtStrategy(

			opts,
			async (jwt_payload, next) => {
				next(null, jwt_payload)
			}))
		return new Promise(async (resolve, reject) => {
			let token = (req.headers.Authorization || req.headers.authorization || req.headers["X-Authorization"] || req.headers["x-authorization"] || '').split(" ").slice(-1)[0]
			let [err, care] = await to(this.sequelize.models.logins.findOne({ where: { token } }))
			// console.log(care)
			if(!care){
				// console.log({token})
				return reject({status:422, message:`Invalid token.`})
			}
			passport.authenticate('jwt', { session: false }, async (err, user, info) => {
				if (err) return reject(err)
				if (info) return reject({ message: info.message, status: 422 })
				let care;
				;[err, care] = await to(this.sequelize.models.users.findOne({where: {userId:user.userId}}))
				if(err)return reject(err)
				if(!care)return reject({status:422, message:`${user.userId} not found.`})
				return resolve(user)
			})(req, res, next)
		})
	}

	async getRoutes(path) {
		return new Promise((resolve, reject) => {
			let endpoints = []
			fse
				.readdirSync(path + '/')
				.filter((modelfile) =>
					modelfile.indexOf('.') < 0
				)
				.forEach((file) => {
					endpoints.push('/' + file)
				})
			let ret = {
				Routes: endpoints
			}
			resolve(ret)
		})
	}
}

module.exports = Csystem
// module.exports.csystem_ = new Csystem