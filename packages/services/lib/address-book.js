const got = require('got');

let serviceURL;

async function init(config) {
    serviceURL = config.ADDRESS_BOOK_URL
}

async function getById(id) {
    const { body } = await got(`${serviceURL}/persons/${id}`, {
        responseType: 'text'
    })
    return JSON.parse(body)
}

async function getAll() {
    const { body } = await got(`${serviceURL}/persons/all`, {
        responseType: 'text'
    })
    return JSON.parse(body)
}

async function createOne(attendee) {
    const { body } = await got(`${serviceURL}/persons`, {
        json: {
            ...attendee,
        },
        method: 'PUT',
        responseType: 'text'
    })
    return JSON.parse(body)
}

async function deleteOne(id) {
    const { body } = got(`${serviceURL}/persons/${id}`, {
        responseType: 'text',
        method: 'DELETE'
    })
    return JSON.parse(body)
}

module.exports = {
    init,
    getAll,
    getById,
    createOne,
    deleteOne,
}
