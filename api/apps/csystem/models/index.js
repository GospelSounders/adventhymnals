'use strict'
const fse = require('fs-extra');
const path = require('path')
const Sequelize = require('sequelize')

// const globalConfig = require(__dirname+'/../../../config/config.system');
// const globalConfig = {}

const db = {}
db.models = {};

function models(globalConfig) {
	// console.log(globalConfig)
	const whichDB = globalConfig[`databaseType`];
	// console.log(whichDB)
	// console.log(globalConfig[`database`])
	// console.log(globalConfig[`database`][whichDB])

	// console.log(globalConfig[`database`][whichDB].credentials)
	// const { host, port, user, password, database } = config.database;
	// const connection = await mysql.createConnection({ host:globalConfig[`database`][whichDB].credentials[`HOST`], 
	// port:globalConfig[`database`][whichDB].credentials[`PORT`] || 3306, 
	// user:globalConfig[`database`][whichDB].credentials[`USER`],
	//  password:globalConfig[`database`][whichDB].credentials[`PASS`]
	//  });
	// await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

	const sequelize = new Sequelize(
		globalConfig[`database`][whichDB].credentials[`DBNAME`],
		globalConfig[`database`][whichDB].credentials[`USER`],
		globalConfig[`database`][whichDB].credentials[`PASS`],
		{
			dialect: whichDB,
			host: globalConfig[`database`][whichDB].credentials[`HOST`],
			port: globalConfig[`database`][whichDB].credentials[`POST`] || 3306,
			logging: false
		}

	)
	db.sequelize = sequelize
	db.Sequelize = Sequelize

	/*
	 * read all folders in apps
	 * 		go to their models folders and load all the models
	 */
	fse
		.readdirSync(__dirname + '/../../')
		.forEach((file) => {
			let appFolder = path.join(__dirname + '/../../', file, 'models')
			// console.log(appFolder)
			try {
				fse
					.readdirSync(appFolder)
					.filter((modelfile) =>
						modelfile !== 'index.js'
					)
					.forEach((modelfile) => {
						try {
							// let model = sequelize.import(path.join(appFolder, modelfile))
							let model = require(path.join(appFolder, modelfile))(sequelize, Sequelize)
							// db[model.name] = model
							db.models[model.name] = model
						} catch (error) {
							console.log(`error reading model: ${error} for ${modelfile}`)
						}
					})

			} catch (err) {

			}

			// /api/app/models
			let innerApp = path.join(__dirname + '/../../', file);
			fse
				.readdirSync(innerApp)
				.forEach((file) => {
					appFolder = path.join(innerApp, file, 'models')
					// console.log(`checking files in ${appFolder}`)
					try {
						fse
							.readdirSync(appFolder)
							.filter((modelfile) =>
								modelfile !== 'index.js'
							)
							.forEach((modelfile) => {
								try {
									// let model = sequelize.import(path.join(appFolder, modelfile))
									let model = require(path.join(appFolder, modelfile))(sequelize, Sequelize);
									db.models[model.name] = model
								} catch (error) {
									console.log(`error reading model: ${error} for ${modelfile}`)
								}
							})
					} catch (err) { }
				})
		})

	Object.keys(db.models).forEach(function (modelName) {
		// console.log('checkcheck', modelName, db.models[modelName].associate)
		if ('associate' in db.models[modelName]) {
			// console.log(`associate ${modelName}`)
			try {
				// console.log(db.models[modelName].associate)
				db.models[modelName].associate(db.models)
			} catch (err) {
				console.log(err)
			}
		}
	})
	return db
}

// console.log(models)
module.exports = models