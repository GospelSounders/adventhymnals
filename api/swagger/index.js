'use strict'
const fse = require('fs-extra');
const csystem = require(__dirname+"/../csystem").csystem;
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swaggerDocument.js');

class Swagger extends csystem
{

	constructor(config)
	{
		super(config)
		// this.config = config
	}

	async main(req, res)
	{
		let self = this
		let endpoints = await self.getRoutes(__dirname)
		res.json(endpoints)
	}
}

module.exports = Swagger