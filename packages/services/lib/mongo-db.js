const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_NAME = "event-calendar-api-db"

let client
let eventsCollection
let registrationsCollection

async function init(config) {
    client = new MongoClient(config.MONGO_URI)
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    eventsCollection = client.db(DB_NAME).collection('events')
    registrationsCollection = client.db(DB_NAME).collection('registrations')
}

async function assertDatabaseConnection() {
    if (!client) {
        throw 'Database connection has not been initialized!'
    }
}

async function getEvent(id) {
    assertDatabaseConnection()
    return await eventsCollection.findOne({_id:ObjectID(id)})
}

async function getAllEvents() {
    assertDatabaseConnection()
    return await eventsCollection.find({}).toArray()
}

async function createEvent(event) {
    assertDatabaseConnection()
    return await eventsCollection.insertOne(event)
}

async function deleteEvent(id) {
    assertDatabaseConnection()
    return await eventsCollection.deleteOne({_id:ObjectID(id)})
}

async function updateEvent(id, update) {
    assertDatabaseConnection()
    return await eventsCollection.replaceOne({_id:ObjectID(id)}, update)
}

async function createEventRegistration(eventId, registration) {
    assertDatabaseConnection()
    return await registrationsCollection.insertOne({eventId, ...registration})
}

async function getEventRegistration(registrationId) {
    assertDatabaseConnection()
    return await registrationsCollection.findOne({_id:ObjectID(registrationId)})
}

async function getAllEventRegistrations(eventId) {
    assertDatabaseConnection()
    let res = await registrationsCollection.find({eventId}).toArray()
    return res
}

async function deleteEventRegistration(registrationId) {
    assertDatabaseConnection()
    return await registrationsCollection.deleteOne({_id:ObjectID(registrationId)})
}


module.exports = {
    init,
    createEvent,
    getEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    createEventRegistration,
    getEventRegistration,
    getAllEventRegistrations,
    deleteEventRegistration,
};