const mongoDbService = require('../../../services').mongoDbService;

async function _create(req, res) {
    try {
        let result = await mongoDbService.createEvent(req.body)
        res.status(200).json({id: result.insertedId})
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res)  {
    try {
        let event = await mongoDbService.getEvent(req.params.id)
        res.status(200).json(event)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _update(req, res)  {
    try {
        let result = await mongoDbService.updateEvent(req.params.id, req.body)
        res.status(200).json({...result.result})
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _delete(req, res)  {
    try {
        let result = await mongoDbService.deleteEvent(req.params.id)
        res.status(200).json({...result.result})
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

module.exports = {
    _create,
    _read,
    _update,
    _delete,
}
