'use strict'
// const MongoStore = require('connect-mongo')(session);
const Sequelize = require("sequelize");
const chalk = require('chalk');

const env       = process.env.NODE_ENV || "dev";
// var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const config = require("../../../config/dbconfig.js")
var sequelize = new Sequelize(config.get("/mysql"));





var db        = {};

class mongo_d
{
	constructor()
	{
		let self = this;
		self.initDb(function(err, results){
			if(err)
			{
				try
				{
					console.log('%s Mysql connection error: %s.', chalk.red('✗'), err.sqlMessage);
				}catch(error)
				{
					console.log('%s Mysql connection error.', chalk.red('✗'));
				}
				process.exit(1);
			}
		})
	}

	initDb(callback)
	{
		let mysql = require('mysql');
		let database = config.get("/mysql/database");
		let query = `CREATE DATABASE IF NOT EXISTS ${database}`

		let con = mysql.createConnection({
		  host: config.get("/mysql/host"),
		  user: config.get("/mysql/username"),
		  password: config.get("/mysql/password")
		});

		con.connect(function(err) {
		  if (err) return callback(err)
		  con.query(query, function (err, result) {
		    if (err);
		    con.end()
		    callback()
		  });
		});
	}
}

module.exports = new mongo_d();