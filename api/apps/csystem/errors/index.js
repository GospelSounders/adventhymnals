const csystem = require(__dirname+'/../csystem')
const path = require('path');
const Async = require('async');

class errohandler extends csystem
{

	static error404(req, res)
	{
		// res.status(404).send({ error: 'Not found', code: '404' });
		res.status(404).json({ error: 'Not found', code: '404' });
	    //add for displaying error pages...
		return;
	}

	static error500(req, res, err, next)
	{
		// res.status(err.status || 500).send({ error: process.env.ENV === "dev"?err.message ||err.msg || err || "Internal Server Error": err.message || "Internal Server Error", code:err.status || err.code ||  500 });
		res.status(err.status || err.code || 500).json({ error: process.env.ENV === "dev"?err.message ||err.msg || err || "Internal Server Error": err.message ||err.msg || "Internal Server Error", code:err.status || err.code ||  500 });
		return next();

	}



	
}

module.exports = errohandler