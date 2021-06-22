'use strict'
const to = require('await-to-js').to
const csystem = require(__dirname+"/../../csystem").csystem;
const {sequelize} = require(__dirname+"/../../csystem").models
const Familyfe = require(__dirname+'/../../../modules/node-familyfe')(sequelize)

class profile extends csystem
{

	constructor()
	{
		super()
	}

	removeSomeFields(care){
		let ret = {...care.dataValues || care}
		ret = JSON.parse(JSON.stringify(ret, (k,v) => (k === 'Cpassword' || k === 'Password' || k === 'emailuid')? undefined : v))
		return ret;
	}

	async register(req, res, next) {
		let self = this;
		let [err, dontcare, care] = [];
		self.makeMePrivate(req)	//make this *private
		let profile = req.body
		let uid = req.params.v1
		profile.uid = uid
		;[err, care] = await to (Familyfe.Profile.add(profile))
		if(err)return Promise.reject(err)
		let ret = self.removeSomeFields(care);
		res.json(ret)
	}

	async listUsers(req, res, next)
	{
		throw ({message: "Method not allowed.", status: 405})
		// let self = this;
		// let [err, dontcare, care] = [];
		// self.makeMePrivate(req)	//make this *private

		// let uid = req.params.v1
		// console.log(req.params)
		// if(uid !== undefined) [err, care] = await to (Familyfe.Person.which({"uid":uid}))
		// else [err, care] = await to (Familyfe.World.parade())
		// if(err)return Promise.reject(err)
		// let ret = self.removeSomeFields(care);
		// res.json(ret)
		// // res.send(care)
	}

	async patchUser(req, res, next)	//not implemented
	{
		throw ({message: "Method not allowed.", status: 405})
	}

	async putUserProfile(req, res, next)
	{
		let self = this;
		let [err, dontcare, care] = [];
		self.makeMePrivate(req)	//make this *private
		let profile = req.body
		let uid = req.params.v1
		profile.uid = uid
		;[err, care] = await to (Familyfe.Profile.updateEmail(profile))
		if(err)return Promise.reject(err)
			// console.log(err)
		;[err, care] = await to(Familyfe.Person.which({"uid":uid}))
		let ret = self.removeSomeFields(care);
		res.json(ret)
	}

	async dropUser(req, res, next)
	{
		let self = this;
		let [err, dontcare, care] = [];
		self.makeMePrivate(req)	//make this *private
		let profile = req.body
		let uid = req.params.v1
		profile.uid = uid
		;[err, care] = await to (Familyfe.Profile.dropEmail(profile))
		if(err)return Promise.reject(err)
		;[err, care] = await to(Familyfe.Person.which({"uid":uid}))
		let ret = self.removeSomeFields(care);
		res.json(ret)
	}

	async common(req, res, action, next)
	{
		let self = this;
		let [err, dontcare, care] = [];
		self.makeMePrivate(req)	//make this *private
		let uid = req.params.v1
		if(uid === undefined)return Promise.reject({status:422, message:"uid is required"})
		let person = req.body
		person.uid = uid;
		if(action === "destroy")
			[err, care] = await to (Familyfe.Person.destroy(person))
		if(action === "update")
			[err, care] = await to (Familyfe.Person.update(person))
		if(err)return Promise.reject(err)
		;[err, care] = await to (Familyfe.Person.which({"uid":uid}))
		if(err)return Promise.reject(err)
		let ret = self.removeSomeFields(care);
		res.json(ret)
		return true
	}

	/*
	 * use this to 
	 *	1. register
	 *	2. list users
	 *	3. update users
	 *	4. delete users
	 *	
	 */
	async main(req, res, next) {
		let self = this;
		let [err, dontcare, care] = [];
		// self.makeMePrivate(req, ["POST","GET","PUT","DELETE","PATCH"]);		
		self.isMethodAllowed(req, ["POST","GET","PUT","DELETE"]);

		let method = req.method;
		let t_req = self.trimReq(req);
		t_req.body = self.sentenceCase(req.body)

		switch(method)
		{
			case "POST":
				;[err, dontcare] = await to(self.register(t_req, res, next));
				break;
			case "GET":
				;[err, dontcare] = await to(self.listUsers(t_req, res, next));
				break;
			case "PATCH": //not implemented
				;[err, dontcare] = await to(self.patchUser(t_req, res, next));
				break;
			case "PUT":
				;[err, dontcare] = await to(self.putUserProfile(t_req, res, next));
				break;
			case "DELETE":
				;[err, dontcare] = await to(self.dropUser(t_req, res, next));
				break;
			default:
				return Promise.reject({message: "Method not allowed", status: 405})
		}

		if(err) {
			console.log(err)
			return Promise.reject(err)
		}

		return true;
	}


}

module.exports = profile