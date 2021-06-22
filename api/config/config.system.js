'use strict';
const Confidence = require('confidence');
const dotenv = require('dotenv');

dotenv.config({ silent: false });
dotenv.load({ path: __dirname+'/../.env' });

const criteria = {
    env: process.env.ENV
};

const config = {
    author: "Brian Onang'o",
    authorGithubUrl: "https://github.com/surgbc",
    applicationName: process.env.APPLICATION_NAME,
    applicationGithubUrl: process.env.APPLICATION_GITHUB_URL,
    guestEmail: process.env.GUEST_EMAIL,
    rootEmail: process.env.ROOT_EMAIL,
    description: process.env.APPLICATION_DESCRIPTION,
    baseUrl: {
        $filter: 'env',
        dev: process.env.BASE_URL_DEV,
        production: process.env.BASE_URL,
        $default: process.env.BASE_URL
    },
    serverRoot: process.env.SERVER_ROOT,
    port: {
        $filter: 'env',
        dev: 3010,
        production: process.env.PORT || 3000,
        $default: process.env.PORT || 3000
    },
    databaseType: process.env.WHICHDATABASE,
    database:{
        mongo:{
            $filter: 'env',
            dev: {
                HOST: process.env.MONGODB_HOST_DEV,
                USER: process.env.MONGODB_USER_DEV,
                PASS: process.env.MONGODB_PASS_DEV,
                DBNAME: process.env.MONGODB_DBNAME_DEV
            },
            production: {
                HOST: process.env.MONGODB_HOST,
                USER: process.env.MONGODB_USER,
                PASS: process.env.MONGODB_PASS,
                DBNAME: process.env.MONGODB_DBNAME
            },
            $default: {
                HOST: process.env.MONGODB_HOST,
                USER: process.env.MONGODB_USER,
                PASS: process.env.MONGODB_PASS,
                DBNAME: process.env.MONGODB_DBNAME
            }
        },
        mysql:{
            $filter: 'env',
            dev: {
                HOST: process.env.MYSQLDB_HOST_DEV,
                USER: process.env.MYSQLDB_USER_DEV,
                PASS: process.env.MYSQLDB_PASS_DEV,
                DBNAME: process.env.MYSQLDB_DBNAME_DEV
            },
            production: {
                HOST: process.env.MYSQLDB_HOST,
                USER: process.env.MYSQLDB_USER,
                PASS: process.env.MYSQLDB_PASS,
                DBNAME: process.env.MYSQLDB_DBNAME
            },
            $default: {
                HOST: process.env.MYSQLDB_HOST,
                USER: process.env.MYSQLDB_USER,
                PASS: process.env.MYSQLDB_PASS,
                DBNAME: process.env.MYSQLDB_DBNAME
            }
        },
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    mailer: { //configure these
        mailgun: {
            api_key:process.env.MAILGUN_API_KEY,
            domain:process.env.MAILGUN_DOMAIN
        },
        system: {
            authorEmail: "surgbc@gmail.com",
            webmasterEmail: process.env.WEBMASTER_EMAIL,
            cystemEmail:  process.env.CSYSTEM_EMAIL,
            replyTo: process.env.REPLYTO_EMAIL,
            noReplyEmail: process.env.NOREPLY_EMAIL,
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
