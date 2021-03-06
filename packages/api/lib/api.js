'use strict'

const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.get('/health', controllers.health)

router.post('/events', controllers.events._create)
router.get('/events', controllers.events._readAll)
router.get('/events/:id', controllers.events._read)
router.put('/events/:id', controllers.events._update)
router.delete('/events/:id', controllers.events._delete)

router.post('/events/:eventId/registrations', controllers.registrations._create)
router.get('/events/:eventId/registrations', controllers.registrations._readAll)
router.get('/events/registrations/:regId', controllers.registrations._read)
router.delete('/events/registrations/:regId', controllers.registrations._delete)

module.exports = router
