const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _readAll(eventId) {
    let result = []
    try {
        let registrations = await mongoDbService.getAllEventRegistrations(eventId)
        for (registration of registrations) {
            if (
                registration.externalAttendeeDetailsId
            ) {
                let attendee = await addressBookService.getById(registration.externalAttendeeDetailsId)
                result.push({
                    event: registration.eventId,
                    regId: `${registration._id}`,
                    ...attendee
                })
            }
        }
        console.log(result)
        return { registration: result}
    } catch(err) {
        console.error(err)
        throw err
    }
}

module.exports = function(args, cb) {
    _readAll(args)
        .then(registrations => {
            cb({
                registrations
            })
    })
}