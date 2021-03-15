const {
    mongoDbService,
} = require('../../../services')

function resourceLocation(req, id) {
    return req.protocol + '://' + req.get('Host') + '/api/v1' + req.url + '/' + id
}

async function _create(req, res) {
    try {
        let result = await mongoDbService.createEvent(req.body)
        let location = resourceLocation(req, result.insertedId)
        res.set('Location', location)
        res.status(201).json({id: result.insertedId})
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _read(req, res)  {

    if (req.params.id.length != 24){
        res.status(400).json({error: "Client requested malformed"})
        return
    }

    try {
        let event = await mongoDbService.getEvent(req.params.id)
        if (event) {
            res.status(200).json(event)
        } else {
            res.status(404).json("404 Not Found")
        }
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _readAll(req, res){
    try {
        let events = await mongoDbService.getAllEvents()
        res.status(200).json(events)
    } catch(err) {
        res.status(500).json("Internal Server Error")
    }
}

async function _update(req, res)  {

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

async function _delete(req, res)  {
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
