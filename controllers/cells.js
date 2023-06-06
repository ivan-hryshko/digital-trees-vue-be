const Cell = require('../models/Cell')
const Field = require('../models/Field')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const getAllCells = async (req, res) => {
  const cells = await Cell.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ cells, count: cells.length })
}

const getCell = async (req, res) => {
  const { user: { userId }, params: { id: cellId} } = req

  const cell = await Cell.findOne({
    _id: cellId,
    createdBy: userId,
  })

  if(!cell) {
    throw new NotFoundError(`No cell with id ${cellId}`)
  }
  res.status(StatusCodes.OK).json({ cell })
}

const createCell = async (req, res) => {
  console.log('req.body :>> ', req.body);
  const { parentTree, field, indexInTree } = req.body

  const fieldObj = await Field.findOne({ _id: field})
  console.log('fieldObj :>> ', fieldObj);

  const cell = await Cell.create(req.body)

  const responseCell = {
    type: cell.type,
    _id: cell._id,
    parentTree: cell.parentTree,
    indexInTree: cell.indexInTree,
    createdAt: cell.createdAt,
    updatedAt: cell.updatedAt,
    field: fieldObj,
  };

  console.log('cell.field.x :>> ', cell.field.x);
  res.status(StatusCodes.CREATED).json({ responseCell })
}

const updateCell = async (req, res) => {
  const {
    user: { userId },
    params: { id: cellId},
    body: { company, position },
   } = req

  if (!company || !position) {
    throw new BadRequestError('Company or position fields cannot be empty')
  }

  const cell = await Cell.findByIdAndUpdate(
    {
      _id: cellId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if(!cell) {
    throw new NotFoundError(`No cell with id ${cellId}`)
  }

  res.status(StatusCodes.OK).json({ cell })
}

const deleteAllCells = async (req, res) => {
  console.log('delete All');

  const cells = await Cell.deleteMany({})

  if(!cells) {
    throw new NotFoundError(`No cells found`)
  }

  res.status(StatusCodes.OK).json({ cells })
}

const deleteCell = async (req, res) => {
  const { params: { id: cellId} } = req

  const cell = await Cell.findByIdAndRemove({
    _id: cellId,
  })

  if(!cell) {
    throw new NotFoundError(`No cell with id ${cellId}`)
  }

  res.status(StatusCodes.OK).json({ cell })
}

module.exports = {
  getAllCells,
  getCell,
  createCell,
  updateCell,
  deleteCell,
  deleteAllCells,
}
