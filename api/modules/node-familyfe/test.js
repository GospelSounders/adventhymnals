const fse = require('fs-extra');
const dotenv = require('dotenv');
//load enviroment variables before config
dotenv.load({ path: '.env.example' });

const familyfe = require("./index.js")

// console.log(familyfe)
// console.log(familyfe.World.Person)
// console.log(familyfe.World.Families.Attributes)
familyfe.Familyfe.connect(function(err, results){
 //    let World = familyfe.World;
	// World.destroyWorld(function(){});
});
