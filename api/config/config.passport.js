const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fse = require('fs-extra');
const LocalStrategy = require('passport-local').Strategy;

// const request = require('request');

const to = require('await-to-js').to
// const csyberUser = require(__dirname+'/../apps/csystem/models/csyberuser');

// const User = require(__dirname+'/../apps/csystem/models/User');
//const User = require('../models/csyberuser');

// console.log(__dirname+'/../apps/csystem')
// console.log(require(__dirname+'/../apps/csystem'))
//////////////////
//use as require(__dirname+'/../apps/csystem/models') and not
//require(__dirname+'/../apps/csystem').models
///////
const { sequelize } = require(__dirname + '/../apps/csystem/models')
// const Familyfe = require(__dirname+'/../modules/node-familyfe')(sequelize)


// if (fse.existsSync('.env'))
//   dotenv.load({ path: __dirname+'/../env' });
// else
//   dotenv.load({ path: __dirname+'/../env.example' });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.generateToken = (user, secret) => {
  let token = jwt.sign(user, secret, {
    expiresIn: 3600 * 10
  });
  return token
}


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  let [err, dontcare, care] = [];
  let person = { Email: email }

  // ;[err, care] = await to (Familyfe.Person.whichwithPwd(person))
  // if(err)return done(err)

  // let user = care
  // if(Object.keys(care).length === 0)return done({"message": "No such user", status:422});
  // let IsActive = user.IsActive
  // if(IsActive === false)
  //     return done({ message: `Email ${email} not Active. Please activate.`, status:422});
  // // console.log(user)
  // [err, care] = await to(user.comparePass(password))
  // if(err) return done(err)
  // if(care === false)return done({ message: 'Wrong email or password.' })

  // user = JSON.parse(JSON.stringify(user))
  // delete user.Password
  // let token = passport.generateToken({id:user.uid});
  // user.token = token
  // return done (null, user)

}));

JwtStrategy.prototype.authorizationParams = function () {
  const req = JwtStrategy.Strategy.authorizationParams.caller.arguments[0];
  // do whatever you need
}

