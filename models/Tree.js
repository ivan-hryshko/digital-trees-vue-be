const mongoose = require('mongoose')

const TreeSchema = new mongoose.Schema({
}, {timestamps: true})

module.exports = mongoose.model('Tree', TreeSchema)