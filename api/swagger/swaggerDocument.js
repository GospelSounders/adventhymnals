const fse = require('fs-extra');
const path = require('path');

let swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'REST API',
        description: '',
        termsOfService: '',
        contact: {
            name: 'The Developer',
            email: 'brian@cseco.co.ke',
            url: 'https://csycms.csymapp.com'
        },
        license: {
            name: 'Apache License Version 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    "host": "",
    "basePath": "/",
    "schemes": [
        "http",
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {

    },
    "tags": []
}
const gatherSwaggerEntries = (config) => {
    swaggerDocument.host = config.domain
    swaggerDocument.info.contact.url = config.copyright.url
    swaggerDocument.info.contact.email = config.contacts.support_email
    fse
        .readdirSync(path.join(__dirname, '/../apps/api'))
        .forEach((file) => {
            try {
                let testPath = path.join(__dirname, '/../apps/api', file)
                fse.readdirSync(testPath)
                let module_ = require(testPath)[file]
                let swaggerEntry = new module_(config).functionsMap()
                let pathsEntries = {}
                for (let path_ in swaggerEntry) pathsEntries[`/${path_}`] = swaggerEntry[path_]
                for (let path_ in pathsEntries) {
                    if (!swaggerDocument.paths[path_]) swaggerDocument.paths[path_] = {};
                    for (let method in pathsEntries[path_]) {
                        if (!swaggerDocument.paths[path_][method.toLowerCase()]) swaggerDocument.paths[path_][method.toLowerCase()] = {};
                        for (let entry in pathsEntries[path_][method]) {
                            if (entry !== 'func') {
                                swaggerDocument.paths[path_][method.toLowerCase()][entry] = pathsEntries[path_][method][entry]
                            }
                        }
                    }
                }

                let tagsEntry = new module_(config).tagsMap()
                if (tagsEntry) {
                    try {
                        tagsEntry.map(tagEntry => swaggerDocument.tags.push(tagEntry))
                    } catch (error) {
                        swaggerDocument.tags.push(tagsEntry)
                    }
                }
            } catch (error) {
                // console.log(file, error)
            }
        })
}
module.exports = function (config) { gatherSwaggerEntries(config); return swaggerDocument };