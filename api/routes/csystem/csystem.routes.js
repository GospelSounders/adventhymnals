// process.exit();

const Csystem = require(__dirname + "/../../apps/csystem/index");
// const csystem = Csystem.csystem;
// const router = Csystem.router;
// const globalConfig = Csystem.globalConfig;

let csystem, router;


class csystemroutes {
	constructor(app, config) {
		// csystem = Csystem.csystem(config);
		router = Csystem.router;
		let returnto = "/#"
		/*
		 * common query string
		 * middleware function to set_defaults_
		 */
		app.use('/:app/:method?/:v1?/:v2?/:v3?/:v4?/:v5?/:v6?/:v7?/:v8?/:v9?/', 
			router.defaults,
			function (req, res, next) {
		if(req.params.app !== 'api')return next();
				for (let i in req.query)
					req.body[i] = req.query[i]
				router.loadpage(config, req, res, function (err, results) {
					// return next()
				})

			})
	}
}

module.exports = csystemroutes
