'use strict'

const express = require('express')
const api = require('../../api')
const config = require('../../config')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser')
const mongoDbService = require('../../services').mongoDbService

const SWAGGER_PATH = '/../../../docs/event-calendar-api-1.1-swagger.yaml';

async function start() {

    const configuration = await config()
    await mongoDbService.init(configuration)
    
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/api/v1/', api)

    let swaggerDocumentation = YAML.load(__dirname + SWAGGER_PATH)
    app.use('/swagger/v1', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

    app.listen(configuration.PORT, () => {
        console.log(`Example app listening at http://localhost:${configuration.PORT}`)
    })
}

module.exports = start
