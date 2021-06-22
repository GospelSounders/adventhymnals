'use strict'
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const chalk = require('chalk');

class mongo_d
{
	constructor(callback)
	{
		mongoose.Promise = global.Promise;
		mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
		mongoose.connection.on('error', (err) => {
		  console.error(err);
		  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
		  process.exit(1);
		});
		setTimeout(function(){callback()},100)
	}
}

module.exports = mongo_d;