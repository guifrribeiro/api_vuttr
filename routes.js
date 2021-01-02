const express = require('express')

const ToolController = require('./src/controllers/ToolController')

const routes = express.Router()

// Tools routes
routes.get('/tools', ToolController.index)
routes.post('/tools', ToolController.store)
routes.delete('/tools/:tool_id', ToolController.delete)

module.exports = routes