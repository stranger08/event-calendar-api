const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _read(id) {

    try {
        let event = await mongoDbService.getEvent(id)
        if (event) {
            let eventId = `${event._id}`
            let registrations = await mongoDbService.getAllEventRegistrations(eventId)
            let attendees = await addressBookService.collectAttendeesList(registrations)
            console.log(event)
            return {
                id: `${event._id}`,
                name: event.name,
                date: event.date,
                location: event.location,
                guests: {
                    guest: event.guests
                },
                attendees: {
                    attendee: attendees
                }
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
        .then(event => {
            cb({
                event
            })
    })
}