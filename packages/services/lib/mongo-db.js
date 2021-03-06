const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_NAME = "event-calendar-api-db"

let client
let eventsCollection

async function init(config) {
    client = new MongoClient(config.MONGO_URI)
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    eventsCollection = client.db(DB_NAME).collection('events')
}

async function getEvent(id) {
    if (!client) {
        throw 'Database connection has not been initialized!'
    }
    return await eventsCollection.findOne({_id:ObjectID(id)})
}

async function createEvent(event) {
    return await eventsCollection.insertOne(event)
}

async function deleteEvent(id) {
    return await eventsCollection.deleteOne({_id:ObjectID(id)})
}

async function updateEvent(id, update) {
    return await eventsCollection.replaceOne({_id:ObjectID(id)}, update)
}


module.exports = {
    init,
    createEvent,
    getEvent,
    deleteEvent,
    updateEvent,
};