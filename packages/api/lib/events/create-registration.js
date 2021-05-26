const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _create(registration) {
    console.log(registration)
    try {
        let addressBookServiceResult = await addressBookService.createOne({
            firstName: registration.name,
            lastName: registration.surname,
            placeOfWork: registration.email
        })
        let result = await mongoDbService.createEventRegistration(registration.eventId, {
            externalAttendeeDetailsId: addressBookServiceResult.id
        })
        return {id: `${result.insertedId}`}
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = function(args, cb) {
    _create(args)
        .then(registration => {
            cb({
                registration
            })
    })
}