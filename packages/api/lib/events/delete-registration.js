const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _delete(regId) {
    try {
        let registration = await mongoDbService.getEventRegistration(regId)
        addressBookService.deleteOne(registration.externalAttendeeDetailsId)
        await mongoDbService.deleteEventRegistration(regId)
        return { id: regId}
    } catch(err) {
        console.error(err)
        throw err
    }
}

module.exports = function(args, cb) {
    _delete(args)
        .then(event => {
            cb({
                event
            })
    })
}