const {
    addressBookService,
    mongoDbService
} = require('../../../services')

function resourceLocation(req, id) {
    return req.protocol + '://' + req.get('Host') + '/api/v1/events/registrations/' + id
}

async function _create(req, res) {
    try {
        let addressBookServiceResult = await addressBookService.createOne({
            firstName: req.body.name,
            lastName: req.body.surname,
            placeOfWork: req.body.email
        })
        let result = await mongoDbService.createEventRegistration(req.params.eventId, {
            externalAttendeeDetailsId: addressBookServiceResult.id
        })
        let location = resourceLocation(req, result.insertedId)
        res.set('Location', location)
        res.status(201).json({id: result.insertedId})
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res) {

    if (req.params.regId.length != 24) {
        res.status(400).json({error: "Client requested malformed"})
        return
    }

    try {
        let registration = await mongoDbService.getEventRegistration(req.params.regId)
        if (registration) {
            let attendee = await addressBookService.getById(registration.externalAttendeeDetailsId)
            if (attendee) {
                res.status(200).json({
                    event: registration.eventId,
                    name: attendee.firstName,
                    surname: attendee.lastName,
                    email: attendee.placeOfWork
                })
            } else {
                console.log("Call to address-book service returned no result, fallback return local data")
                res.status(200).json(registration)
            }
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
        let registrations = await mongoDbService.getAllEventRegistrations(req.params.eventId)
        for (registration of registrations) {
            if (
                registration.externalAttendeeDetailsId
            ) {
                let attendee = await addressBookService.getById(registration.externalAttendeeDetailsId)
                result.push({
                    event: registration.eventId,
                    ...attendee
                })
            }
        }
        res.status(200).json(result)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _delete(req, res) {
    try {
        let registration = await mongoDbService.getEventRegistration(req.params.regId)
        addressBookService.deleteOne(registration.externalAttendeeDetailsId)
        let result = await mongoDbService.deleteEventRegistration(req.params.regId)
        res.status(204).json({...result.result})
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

module.exports = {
    _create,
    _read,
    _readAll,
    _delete,
}
