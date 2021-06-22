const csystem = require(__dirname+'/csystem');
// const models = require(__dirname+'/models');
const csErrors = require(__dirname+'/errors');
// const globalConfig = require(__dirname+'/../../config/config.system');
// const passportConfig = require(__dirname+'/../../config/config.passport');

module.exports.csystem = csystem;
// module.exports.models = models;
module.exports.csErrors = csErrors;
// module.exports.globalConfig = globalConfig;
// module.exports.passportConfig = passportConfig;
module.exports.router = require(__dirname+'/router');