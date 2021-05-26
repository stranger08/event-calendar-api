const eventAPI = {
    EventCalendarService: {
        EventCalendarPort: {
            getEvents: require('./get-events'),
            getEventById: require('./get-by-id'),
            deleteEvent: require('./delete-event'),
            createEvent: require('./create-event'),
            createEventRegistration: require('./create-registration'),
            getEventRegistrations: require('./get-event-registrations'),
            getRegistration: require('./get-registration-by-id'),
            deleteRegistration: require('./delete-registration'),
        }
    }
}

module.exports = eventAPI