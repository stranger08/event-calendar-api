const {
    mongoDbService, addressBookService,
} = require('../../../services')

const lodash = require('lodash')
const { Logger } = require('mongodb')

function resourceLocation(req, id) {
    return req.protocol + '://' + req.get('Host') + '/api/v1' + req.url + '/' + id
}

async function _create(req, res) {
    try {
        let result = await mongoDbService.createEvent({
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            guests: req.body.guests
        })

        let eventId = result.insertedId
        let attendees = req.body.attendees

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

        let location = resourceLocation(req, eventId)
        res.set('Location', location)
        res.status(201).json({id: eventId})
    } catch (err) {
        console.error(err)
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res) {

    if (req.params.id.length != 24) {
        res.status(400).json({error: "Client requested malformed"})
        return
    }

    try {
        let event = await mongoDbService.getEvent(req.params.id)
        if (event) {
            let eventId = `${event._id}`
            let registrations = await mongoDbService.getAllEventRegistrations(eventId)
            let attendees = await addressBookService.collectAttendeesList(registrations)
            res.status(200).json({
                ...event,
                attendees: attendees ? attendees : []
            })
        } else {
            res.status(404).json("404 Not Found")
        }
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _readAll(req, res) {
    let result = []
    try {
        let events = await mongoDbService.getAllEvents()
        for (e of events) {
            let eventId = `${e._id}`
            let registrations = await mongoDbService.getAllEventRegistrations(eventId)
            let attendees = await addressBookService.collectAttendeesList(registrations)
            result.push({
                ...e,
                attendees
            })
        }
        res.status(200).json(result)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _update(req, res) {

    if (req.params.id.length != 24){
        res.status(400).json({error: "Client requested malformed"})
        return
    }

    try {
        let result = await mongoDbService.updateEvent(req.params.id, req.body)
        res.status(200).json({...result.result})
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _delete(req, res) {
    try {
        let result = await mongoDbService.deleteEvent(req.params.id)
        res.status(204).json({...result.result})
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

module.exports = {
    _create,
    _read,
    _readAll,
    _update,
    _delete,
}
