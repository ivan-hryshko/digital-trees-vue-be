const mongoose = require('mongoose')

const CellSchema = new mongoose.Schema({
  indexInTree: {
    type: Number,
    required: [true, 'Please provide indexInTree'],
  },
  type: {
    type: String,
    enum: ['head', 'body'],
    default: 'head',
    validate: {
      validator: function(value) {
        return ['head', 'body'].includes(value);
      },
      message: 'Invalid type value it can be \'head\' or \'body\''
    }
  },
  field: {
    type: mongoose.Types.ObjectId,
    ref: 'Field',
    required: [true, 'Please provide field id']
  },
  nextCell: {
    type: mongoose.Types.ObjectId,
    ref: 'Cell',
    // required: [true, 'Please provide user']
  },
  createdFromCell: {
    type: mongoose.Types.ObjectId,
    ref: 'Cell',
    // required: [true, 'Please provide user']
  },
  parentTree: {
    type: mongoose.Types.ObjectId,
    ref: 'Tree',
    required: [true, 'Please provide parent tree']
  },
  // this.nextCell = null
  // this.parentTree = null
}, {timestamps: true})

module.exports = mongoose.model('Cell', CellSchema)