const express = require('express')

const ToolController = require('./src/controllers/ToolController')
const SessionController = require('./src/controllers/SessionController')
const myJwt = require('./src/functions/jwt')

const routes = express.Router()

// Tools routes
routes.get('/tools', myJwt.verifyJWT, ToolController.index)
routes.post('/tools', myJwt.verifyJWT, ToolController.store)
routes.delete('/tools/:tool_id', myJwt.verifyJWT, ToolController.delete)

// Sessions routes
routes.post('/sessions', SessionController.store)
routes.post('/auth', SessionController.authentication)

module.exports = routes