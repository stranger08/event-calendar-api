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

async function collectAttendeesList(registrations) {
    let result = []
    try {
        for (registration of registrations) {
            if (
                registration.externalAttendeeDetailsId
            ) {
                let attendee = await getById(registration.externalAttendeeDetailsId)
                result.push({
                    event: registration.eventId,
                    regId: `${registration._id}`,
                    ...attendee
                })
            }
        }
    } catch (err) {
        console.error("Error reaching to addressbook service!", err)
    }
    return result
}

module.exports = {
    init,
    getAll,
    getById,
    createOne,
    deleteOne,
    collectAttendeesList,
}
