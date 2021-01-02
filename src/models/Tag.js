const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  description: String
})

module.exports = mongoose.model('Tag', TagSchema)