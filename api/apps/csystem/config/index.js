'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config({ silent: false });

const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    name:"csystem",
    displayname:false,      // || or false if it should not be shown in app list
	// url:"csystem/app/elements",
	enabled: {    // require this from db
        root:"restricted",
        user:"free",
        nobody:"free"
    },
    groups: [
        "nobody",
        "user",
        "root"
    ], 
    AutoInstall: true,
    "canuninstall":
    {
        root:false,
        user:false,
        nobody:false
    },
	"free":  {
		groups:{
			user:"user",
            nobody:"nobody"
		}
	},
	"restricted":  {
		groups:{
			admin:"root",
			user:"user",
            nobody:"nobody"
		}
	},
    "dos":  {
        groups:{
            dos:"dos",
            user:"user",
            nobody:"nobody"
        }
    },
    actions:
    {
    	"install":{
    		groups:{
    			root:"root"
    		}
    	}
    }

};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
