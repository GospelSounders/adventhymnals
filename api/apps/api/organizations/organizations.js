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

	listOrganizations = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let [err, care] = await to(this.sequelize.models.organizations.findAll({ attributes: ['organizationId', 'organizationName'] }))
			if (err) return reject(err)
			let ret = [];
			care.map(item => ret.push(item.dataValues))
			resolve(ret);
		})
	}
	



	functionsMap = () => {
		return {
			"api/organizations": {
				'GET': {
					func: this.listOrganizations,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"organizations-controller"
					],
					"summary": "listOrganizations",
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
				"name": "organizations-controller",
				"description": "Organizations Controller"
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