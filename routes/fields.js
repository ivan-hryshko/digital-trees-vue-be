const express = require('express');
const router = express.Router()

const {
  getAllFields,
  getField,
  createField,
  updateField,
  deleteField,
  deleteAllField,
} = require('../controllers/fileds')

router.route('/').post(createField).get(getAllFields)
router.route('/all').delete(deleteAllField)
router.route('/:id').get(getField).delete(deleteField).patch(updateField)

module.exports = router