'use strict'

const http = require('http')
const soap = require('strong-soap').soap;
const config = require('../../config')
const { soapAPI } = require('../../api')

const {
    mongoDbService,
    addressBookService,
} = require('../../services')

const WSDL_PATH = './wsdl/event-calendar/event-calendar.service.wsdl'

async function start() {

    const configuration = await config()
    await mongoDbService.init(configuration)
    await addressBookService.init(configuration)

    let WSDL = require('fs').readFileSync(WSDL_PATH, 'utf8')
    let server = http.createServer(function(request,response) {
        response.end("404: Not Found: " + request.url);
    });

    server.listen(configuration.PORT);
    soap.listen(server, '/event-calendar-service', soapAPI, WSDL);
}

module.exports = start
