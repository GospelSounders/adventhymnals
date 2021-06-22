const path = require('path');
const conf = require('node-etc');

class csycmsApi {
    constructor() {
    }

    routesDir() {
        return path.join(__dirname, "routes");
    }
    swaggerDir() {
        return path.join(__dirname, "swagger");
    }
    swaggerData(){
        // console.log(conf.projectRoot())
        // console.log(conf.packageJson())
    }
}


module.exports = new csycmsApi();