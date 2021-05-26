const {
    addressBookService,
    mongoDbService
} = require('../../../services')

async function _readAll() {
    let result = []
    try {
        let events = await mongoDbService.getAllEvents()
        for (e of events) {
            let eventId = `${e._id}`
            let registrations = await mongoDbService.getAllEventRegistrations(eventId)
            let attendees = await addressBookService.collectAttendeesList(registrations)
            result.push({
                ...{
                    id: `${e._id}`,
                    name: e.name,
                    date: e.date,
                    location: e.location,
                    guests: {
                        guest: e.guests
                    },
                },
                attendees: { attendee: attendees }
            })
        }
        return result
    } catch(err) {
        throw err
    }
}

module.exports = function(args, cb) {
    _readAll()
        .then(event => {
            cb({
                event
            })
    })
}