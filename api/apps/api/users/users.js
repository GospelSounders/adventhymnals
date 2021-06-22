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
// let sequelize, Familyfe;

const helpers_ = require('../helpers').helpers
let helpers;


class users extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	listAllUsers = async (req, res, next) => {
		let filters = {};
		try {
			filters = JSON.parse(req.query.filters)
		} catch (error) {}
		let where = filters;
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.sequelize.models.users.findAll({where}))
			if (err) return reject(err)
			let ret = [];
			care.map(item => ret.push(item.dataValues))
			resolve(ret);
		})
	}

	functionsMap = () => {
		return {
			"api/users?filters": {
				'GET': {
					func: this.listAllUsers,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"users-controller"
					],
					"summary": "listAllUsers",
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
					]
					,
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
				"name": "users-controller",
				"description": "Users Controller"
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

module.exports = users