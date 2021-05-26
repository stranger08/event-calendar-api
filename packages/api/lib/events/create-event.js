const {
    addressBookService,
    mongoDbService
} = require('../../../services')

const lodash = require('lodash')

async function _create(args) {
    console.log(args)
    try {
        let result = await mongoDbService.createEvent({
            name: args.name,
            date: args.date,
            location: args.location,
            guests: args.guests.guest
        })

        let eventId = result.insertedId
        let attendees = [args.attendees.attendee]

        if (!lodash.isEmpty(attendees) && lodash.isArray(attendees)) {
            for (attendee of attendees) {
                let addressBookServiceResult = await addressBookService.createOne({
                    firstName: attendee.name,
                    lastName: attendee.surname,
                    placeOfWork: attendee.email
                })
                await mongoDbService.createEventRegistration(`${eventId}`, {
                    externalAttendeeDetailsId: addressBookServiceResult.id
                })
            }
        }

        return {
            id: `${eventId}`
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = function(args, cb) {
    _create(args)
        .then(event => {
            cb({
                event
            })
    })
}