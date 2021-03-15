const { mongoDbService } = require('../../../services')

function resourceLocation(req, id) {
    return req.protocol + '://' + req.get('Host') + '/api/v1/events/registrations/' + id
}

async function _create(req, res) {
    try {
        let result = await mongoDbService.createEventRegistration(req.params.eventId, req.body)
        let location = resourceLocation(req, result.insertedId)
        res.set('Location', location)
        res.status(201).json({id: result.insertedId})
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res) {

    if (req.params.id.length != 24){
        res.status(400).json({error: "Client requested malformed"})
        return
    }

    try {
        let event = await mongoDbService.getEventRegistration(req.params.regId)
        if (even) {
            res.status(200).json(event)
        } else {
            res.status(404).json("404 Not Found")
        }
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _readAll(req, res) {
    try {
        let events = await mongoDbService.getAllEventRegistrations(req.params.eventId)
        res.status(200).json(events)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _delete(req, res) {
    try {
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
