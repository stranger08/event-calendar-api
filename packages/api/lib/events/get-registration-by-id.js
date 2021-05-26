const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _read(regId) {

    try {
        let registration = await mongoDbService.getEventRegistration(regId)
        if (registration) {
            let attendee = await addressBookService.getById(registration.externalAttendeeDetailsId)
            if (attendee) {
                return {
                    event: registration.eventId,
                    name: attendee.firstName,
                    surname: attendee.lastName,
                    email: attendee.placeOfWork
                }
            } else {
                console.log("Call to address-book service returned no result, fallback return local data")
                return registration
            }
        } else {
            return {}
        }
    } catch(err) {
        console.error(err)
        throw err
    }
}

module.exports = function(args, cb) {
    _read(args)
        .then(registration => {
            cb({
                registration
            })
    })
}