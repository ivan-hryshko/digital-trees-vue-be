const express = require('express');
const router = express.Router()

const {
  getAllCells,
  getCell,
  createCell,
  updateCell,
  deleteCell,
  deleteAllCells,
} = require('../controllers/cells')

router.route('/').post(createCell).get(getAllCells)
router.route('/all').delete(deleteAllCells)
router.route('/:id').get(getCell).delete(deleteCell).patch(updateCell)

module.exports = router