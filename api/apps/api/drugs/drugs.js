'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
// const etc = require('node-etc')
// const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const {sequelize} = require(__dirname+"/../../csystem").models
// const Familyfe = require(__dirname+'/../../../modules/node-familyfe')(sequelize)
// let sequelize, Familyfe;

const helpers_ = require('../helpers').helpers
let helpers;


class drugs extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	saveDrugCategory = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { category, verified } = req.body
			if (!verified) verified = false
			let categoryLowerCase = category.toLowerCase().replace(/ /g, '');
			// check that entry does not already exist...
			let [err, care] = await to(this.sequelize.models.drugCategories.findOne({ where: { categoryLowerCase } }));
			if (care) {
				return reject({ status: 422, message: `${category} or similar category already exists` })
			}
			;[err, care] = await to(this.sequelize.models.drugCategories.create({ category, verified, categoryLowerCase }))
			resolve(care);
		})
	}

	saveAPILevel1 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { drugCategoryId, api, verified } = req.body
			let drugCategoryDrugCategoryId = drugCategoryId;
			if (!verified) verified = false
			let apiLowerCase = api.toLowerCase().replace(/ /g, '');
			// check that entry does not already exist...
			let [err, care] = await to(this.sequelize.models.apiLevelOne.findOne({ where: { apiLowerCase, drugCategoryDrugCategoryId } }));
			if (care) {
				return reject({ status: 422, message: `api:${api} or similar api already exists` })
			}
			;[err, care] = await to(this.sequelize.models.apiLevelOne.create({ api, verified, apiLowerCase, drugCategoryDrugCategoryId }));
			let ret = care.dataValues
			delete ret.drugCategoryDrugCategoryId
			resolve(care);
		})
	}

	saveAPILevel2 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { apiLevelOneId, api, verified } = req.body
			let apiLevelOneApiLevelOneId = apiLevelOneId;
			if (!verified) verified = false
			let apiLowerCase = api.toLowerCase().replace(/ /g, '');
			// check that entry does not already exist...
			let [err, care] = await to(this.sequelize.models.apiLevelTwo.findOne({ where: { apiLowerCase, apiLevelOneApiLevelOneId } }));
			if (care) {
				return reject({ status: 422, message: `api:${api} or similar api already exists` })
			}
			;[err, care] = await to(this.sequelize.models.apiLevelTwo.create({ api, verified, apiLowerCase, apiLevelOneApiLevelOneId }));
			let ret = care.dataValues
			delete ret.apiLevelOneApiLevelOneId
			resolve(care);
		})
	}

	deleteAPILevel1 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { apiLevelOneId } = req.query
			let [err, care] = await to(this.sequelize.models.apiLevelOne.destroy({ where: { apiLevelOneId } }));
			resolve();
		})
	}
	deleteAPILevel2 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { apiLevelTwoId } = req.query
			let [err, care] = await to(this.sequelize.models.apiLevelTwo.destroy({ where: { apiLevelTwoId } }));
			resolve();
		})
	}


	listDrugCategories = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { category, verified } = req.query
			let where = {};
			if (category) {
				let categoryLowerCase = category.replace(/ /g, '').toLowerCase()
				where.categoryLowerCase = categoryLowerCase
			}
			if (verified !== undefined && verified.length !== 0) {
				verified = this.parseBool(verified)
				where.verified = verified
			}
			let [err, care] = await to(this.sequelize.models.drugCategories.findAll({ where }));
			let ret = care;
			ret = ret.map(item => {
				item = item.dataValues;
				delete item.categoryLowerCase
				return item
			})
			resolve(ret);
		})
	}
	editDrugCategory = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { category, verified, drugCategoryId } = req.body
			let [err, care] = await to(this.sequelize.models.drugCategories.findOne({ where: { drugCategoryId } }));
			let selectedCategory = care;
			let updateValues = {};
			if (category) {
				// check that another does not already exist
				let categoryLowerCase = category.toLowerCase().replace(/ /g, '');
				// console.log(categoryLowerCase);
				;[err, care] = await to(this.sequelize.models.drugCategories.findOne({ where: { categoryLowerCase } }));
				// console.log(care)
				if (care) {
					if (care.dataValues.drugCategoryId !== drugCategoryId)
						return reject({ status: 422, message: `${category} or similar category already exists` })
				}
				updateValues.category = category
				updateValues.categoryLowerCase = categoryLowerCase
			}
			// if (verified !== undefined && verified.length !== 0) updateValues.verified = verified
			if (verified !== undefined && verified.length !== 0) {
				verified = this.parseBool(verified)
				updateValues.verified = verified
			}
			await to(selectedCategory.update(updateValues))
			let ret = care;
			;[err, care] = await to(this.sequelize.models.drugCategories.findOne({ where: { drugCategoryId } }));
			ret = care.dataValues
			delete ret.categoryLowerCase
			resolve(ret);
		})
	}

	deleteDrugCategory = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { drugCategoryId } = req.query
			let [err, care] = await to(this.sequelize.models.drugCategories.destroy({ where: { drugCategoryId } }));
			resolve();
		})
	}

	getAPILevel1 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { drugCategoryId, api, verified, apiLevelOneId } = req.query

			let associatedWhere = {}
			if (api) {
				let apiLowerCase = api.toLowerCase().replace(/ /g, '');
				associatedWhere.apiLowerCase = apiLowerCase
			}
			// if (verified !== undefined && verified.length !== 0) associatedWhere.verified = verified
			if (verified !== undefined && verified.length !== 0) {
				console.log(verified)
				verified = this.parseBool(verified)
				associatedWhere.verified = verified
			}
			if (apiLevelOneId) associatedWhere.apiLevelOneId = apiLevelOneId
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.apiLevelOne,
							where: associatedWhere
						},
					]
			};
			let where = {};
			if (drugCategoryId) where.drugCategoryId = drugCategoryId
			console.log(where)
			console.log(associatedWhere)
			let [err, care] = await to(this.sequelize.models.drugCategories.findAll(Object.assign({ where }, associated)));
			let ret = [];
			if (care) {
				care.map(level1 => {
					let apiLevel1s = level1.apiLevelOnes
					apiLevel1s.map(item => {
						item = item.dataValues
						item.category = level1.dataValues.category
						delete item.apiLowerCase
						item.drugCategoryId = item.drugCategoryDrugCategoryId
						delete item.drugCategoryDrugCategoryId
						ret.push(item)
					})
				})
			}
			resolve(ret);
		})
	}
	getAPILevel2 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { drugCategoryId, api, apiLevelOneId, apiLevelTwoId, apiLevel2, verified } = req.query
			let where = {};
			if (drugCategoryId) where.drugCategoryId = drugCategoryId

			let associatedWhere = {}

			if (api) {
				let apiLowerCase = api.toLowerCase().replace(/ /g, '');
				associatedWhere.apiLowerCase = apiLowerCase
			}
			if (apiLevelOneId) associatedWhere.apiLevelOneId = apiLevelOneId

			let associatedAssociatedWhere = {}
			if (apiLevelTwoId) associatedAssociatedWhere.apiLevelTwoId = apiLevelTwoId
			if (apiLevel2) {
				let apiLevel2LowerCase = apiLevel2.toLowerCase().replace(/ /g, '');
				associatedAssociatedWhere.apiLowerCase = apiLevel2LowerCase
			}
			if (verified !== undefined && verified.length !== 0) {
				console.log(verified)
				verified = this.parseBool(verified)
				associatedAssociatedWhere.verified = verified
			}

			let associated = {
				include:
					[
						{
							model: this.sequelize.models.apiLevelOne,
							where: associatedWhere,
							include: [
								{
									model: this.sequelize.models.apiLevelTwo,
									where: associatedAssociatedWhere,
								}
							]
						},
					]
			};

			console.log(where)
			console.log(associatedWhere)
			let [err, care] = await to(this.sequelize.models.drugCategories.findAll(Object.assign({ where }, associated)));
			let ret = [];
			if (care) {
				care.map(level1 => {
					let apiLevel1s = level1.apiLevelOnes
					apiLevel1s.map(itemLevel1 => {
						let itemLevel1DataValues = itemLevel1.dataValues
						let itemLevel2 = itemLevel1.apiLevelTwos
						itemLevel2.map(item => {
							item = item.dataValues
							ret.push(item)
							delete item.apiLevelOneApiLevelOneId
							delete item.apiLowerCase
							let { apiLevelOneId, api } = itemLevel1DataValues
							item.apiLevelOne = { apiLevelOneId, api }
							item.apiLevelOne.verified = itemLevel1DataValues.verified
							let { category, drugCategoryId } = level1.dataValues
							item.drugCategory = { category, drugCategoryId }
							item.drugCategory.verified = level1.dataValues.verified
						})
					})
				})
			}
			resolve(ret);
		})
	}
	editAPILevel1 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { apiLevelOneId, verified, api } = req.body
			let [err, care] = await to(this.sequelize.models.apiLevelOne.findOne({ where: { apiLevelOneId } }));
			let selectedCategory = care;
			let drugCategoryDrugCategoryId = care.dataValues.drugCategoryDrugCategoryId
			let updateValues = {};
			if (api) {
				// check that another does not already exist
				let apiLowerCase = api.toLowerCase().replace(/ /g, '');
				// console.log(categoryLowerCase);
				;[err, care] = await to(this.sequelize.models.apiLevelOne.findOne({ where: { apiLowerCase, drugCategoryDrugCategoryId } }));
				// console.log(care)
				if (care) {
					if (care.dataValues.apiLevelOneId !== apiLevelOneId)
						return reject({ status: 422, message: `api:${api} or similar category already exists` })
				}
				updateValues.api = api
				updateValues.apiLowerCase = apiLowerCase
			}
			// if (verified !== undefined && verified.length !== 0) updateValues.verified = verified
			if (verified !== undefined && verified.length !== 0) {
				verified = this.parseBool(verified)
				updateValues.verified = verified
			}
			await to(selectedCategory.update(updateValues))
			let ret = care;
			;[err, care] = await to(this.sequelize.models.apiLevelOne.findOne({ where: { apiLevelOneId } }));
			ret = care.dataValues
			delete ret.apiLowerCase
			resolve(ret);
		})
	}
	editAPILevel2 = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { apiLevelTwoId, verified, api } = req.body
			let [err, care] = await to(this.sequelize.models.apiLevelTwo.findOne({ where: { apiLevelTwoId } }));
			let selectedCategory = care;
			let apiLevelOneApiLevelOneId = care.dataValues.apiLevelOneApiLevelOneId
			let updateValues = {};
			if (api) {
				// check that another does not already exist
				let apiLowerCase = api.toLowerCase().replace(/ /g, '');
				// console.log(categoryLowerCase);
				;[err, care] = await to(this.sequelize.models.apiLevelTwo.findOne({ where: { apiLowerCase, apiLevelOneApiLevelOneId } }));
				// console.log(care)
				if (care) {
					if (care.dataValues.apiLevelTwoId !== apiLevelTwoId)
						return reject({ status: 422, message: `api:${api} or similar category already exists` })
				}
				updateValues.api = api
				updateValues.apiLowerCase = apiLowerCase
			}
			// if (verified !== undefined && verified.length !== 0) updateValues.verified = verified
			if (verified !== undefined && verified.length !== 0) {
				verified = this.parseBool(verified)
				updateValues.verified = verified
			}
			await to(selectedCategory.update(updateValues))
			let ret = care;
			;[err, care] = await to(this.sequelize.models.apiLevelTwo.findOne({ where: { apiLevelTwoId } }));
			ret = care.dataValues
			delete ret.apiLowerCase
			resolve(ret);
		})
	}




	functionsMap = () => {
		return {
			"api/drugs/category/apilevel1": {
				'POST': {
					func: this.saveAPILevel1,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"drugCategory"
					],
					"tags": [
						"drugs-api1Level1-controller"
					],
					"summary": "saveAPILevel1",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"drugCategoryId": { "type": "string", required: true },
										"api": { "type": "string", required: true },
										"verified": { "type": "boolean", required: false, default: false },
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
				'PATCH': {
					func: this.editAPILevel1,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"apiLevelOne"
					],
					"tags": [
						"drugs-api1Level1-controller"
					],
					"summary": "editAPILevel1",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"apiLevelOneId": { "type": "string", required: true },
										"api": { "type": "string", required: false },
										"verified": { "type": "boolean", required: false, default: false },
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
			"api/drugs/category/apilevel1?verified&drugCategoryId&api&apiLevelOneId": {
				'GET': {
					func: this.getAPILevel1,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
					],
					"tags": [
						"drugs-api1Level1-controller"
					],
					"summary": "getAPILevel1",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "drugCategoryId",
							"in": "query",
							"description": "drugCategoryId",
							"required": false,
							"type": "string"
						}, {
							"name": "apiLevelOneId",
							"in": "query",
							"description": "apiLevelOneId",
							"required": false,
							"type": "string"
						}, {
							"name": "api",
							"in": "query",
							"description": "apiLevel1",
							"required": false,
							"type": "string"
						}, {
							"name": "verified",
							"in": "query",
							"description": "verified",
							"required": false,
							"type": "boolean"
						},
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
				},
				'DELETE': {
					func: this.deleteAPILevel1,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"apiLevelOne"
					],
					"tags": [
						"drugs-api1Level1-controller"
					],
					"summary": "deleteAPILevel1",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "apiLevelOneId",
							"in": "query",
							"description": "apiLevelOneId",
							"required": true,
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
				},
			},
			"api/drugs/category/apilevel2?verified&drugCategoryId&api&apiLevelOneId&apiLevelTwoId&apiLevel2": {
				'GET': {
					func: this.getAPILevel2,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
					],
					"tags": [
						"drugs-api1Level2-controller"
					],
					"summary": "getAPILevel2",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "drugCategoryId",
							"in": "query",
							"description": "drugCategoryId",
							"required": false,
							"type": "string"
						}, {
							"name": "apiLevelOneId",
							"in": "query",
							"description": "apiLevelOneId",
							"required": false,
							"type": "string"
						}, {
							"name": "api",
							"in": "query",
							"description": "apiLevel1",
							"required": false,
							"type": "string"
						}
						, {
							"name": "apiLevelTwoId",
							"in": "query",
							"description": "apiLevelTwoId",
							"required": false,
							"type": "string"
						}, {
							"name": "apiLevel2",
							"in": "query",
							"description": "apiLevel2",
							"required": false,
							"type": "string"
						},
						{
							"name": "verified",
							"in": "query",
							"description": "verified",
							"required": false,
							"type": "boolean"
						},
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
				},
				'DELETE': {
					func: this.deleteAPILevel2,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"apiLevelTwo"
					],
					"tags": [
						"drugs-api1Level2-controller"
					],
					"summary": "deleteAPILevel2",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}, {
							"name": "apiLevelTwoId",
							"in": "query",
							"description": "apiLevelTwoId",
							"required": true,
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
				},
			},
			"api/drugs/category/apilevel12": {
				'POST': {
					func: this.saveAPILevel2,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"apiLevelOne"
					],
					"tags": [
						"drugs-api1Level2-controller"
					],
					"summary": "saveAPILevel2",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"apiLevelOneId": { "type": "string", required: true },
										"api": { "type": "string", required: true },
										"verified": { "type": "boolean", required: false, default: false },
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
				'PATCH': {
					func: this.editAPILevel2,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"apiLevelTwo"
					],
					"tags": [
						"drugs-api1Level2-controller"
					],
					"summary": "editAPILevel2",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"apiLevelTwoId": { "type": "string", required: true },
										"api": { "type": "string", required: false },
										"verified": { "type": "boolean", required: false, default: false },
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
			"api/drugs/category": {
				'POST': {
					func: this.saveDrugCategory,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"drugs-category-controller"
					],
					"summary": "saveDrugCategory",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"category": { "type": "string", required: true },
										"verified": { "type": "boolean", required: false, default: false },
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
				'PATCH': {
					func: this.editDrugCategory,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"drugCategory"
					],
					"tags": [
						"drugs-category-controller"
					],
					"summary": "editDrugCategory",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"drugCategoryId": { "type": "string", required: true },
										"category": { "type": "string", required: false },
										"verified": { "type": "boolean", required: false, default: false },
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
			"api/drugs/category?drugCategoryId": {
				'DELETE': {
					func: this.deleteDrugCategory,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					ensureExists: [
						"drugCategory"
					],
					"tags": [
						"drugs-category-controller"
					],
					"summary": "deleteDrugCategory",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "drugCategoryId",
							"in": "query",
							"description": "drugCategoryId",
							"required": true,
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
			},
			"api/drugs/categories": {
				'GET': {
					func: this.listDrugCategories,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"drugs-category-controller"
					],
					"summary": "listDrugCategories",
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
			"api/drugs/categories?verified": {
				'GET': {
					func: this.listDrugCategories,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"drugs-category-controller"
					],
					"summary": "listDrugCategories",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "verified",
							"in": "query",
							"description": "verified",
							"required": false,
							"type": "boolean"
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
			},
			"api/drugs/categories?category&verified": {
				'GET': {
					func: this.listDrugCategories,
					requiresLogin: true,
					requiresAdmin: true,
					doForAnother: false,
					"tags": [
						"drugs-category-controller"
					],
					"summary": "listDrugCategories",
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						},
						{
							"name": "category",
							"in": "query",
							"description": "category",
							"required": false,
							"type": "string"
						},
						{
							"name": "verified",
							"in": "query",
							"description": "verified",
							"required": false,
							"type": "boolean"
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
				"name": "drugs-category-controller",
				"description": "Drugs Controller"
			}, {
				"name": "drugs-api1Level1-controller",
				"description": "API Level1 Controller"
			}, {
				"name": "drugs-api1Level2-controller",
				"description": "API Level2 Controller"
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

module.exports = drugs