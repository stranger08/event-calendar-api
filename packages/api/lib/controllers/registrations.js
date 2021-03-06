const mongoDbService = require('../../../services').mongoDbService;

async function _create(req, res) {
    try {
        let result = await mongoDbService.createEventRegistration(req.params.eventId, req.body)
        res.status(200).json({id: result.insertedId})
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res)  {
    try {
        let event = await mongoDbService.getEventRegistration(req.params.regId)
        res.status(200).json(event)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _readAll(req, res){
    try {
        let events = await mongoDbService.getAllEventRegistrations(req.params.eventId)
        res.status(200).json(events)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _delete(req, res)  {
    try {
        let result = await mongoDbService.deleteEventRegistration(req.params.regId)
        res.status(200).json({...result.result})
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
