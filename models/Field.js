const mongoose = require('mongoose')

const FieldSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: [true, 'Please provide x coordinate'],
  },
  y: {
    type: Number,
    required: [true, 'Please provide y coordinate'],
  },
}, {timestamps: true})

module.exports = mongoose.model('Field', FieldSchema)