const express = require('express');
const router = express.Router()

const {
  getAllTrees,
  getTree,
  createTree,
  updateTree,
  deleteTree,
  deleteAllTree,
} = require('../controllers/trees')

router.route('/').post(createTree).get(getAllTrees)
router.route('/all').delete(deleteAllTree)
router.route('/:id').get(getTree).delete(deleteTree).patch(updateTree)

module.exports = router