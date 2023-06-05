const Field = require('../models/Field')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const getAllFields = async (req, res) => {
  const fields = await Field.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ fields, count: fields.length })
}

const getField = async (req, res) => {
  const { user: { userId }, params: { id: fieldId} } = req

  const field = await Field.findOne({
    _id: fieldId,
    createdBy: userId,
  })

  if(!field) {
    throw new NotFoundError(`No field with id ${fieldId}`)
  }
  res.status(StatusCodes.OK).json({ field })
}

const createField = async (req, res) => {
  console.log('req.body :>> ', req.body);
  const { height, width } = req.body

  if (height && width) {
    const fields = []
    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        const field = await Field.create({ x:i, y: j})
        fields.push(field)
      }
    }
    res.status(StatusCodes.CREATED).json({ count: fields.length, fields })
  } else {
    const field = await Field.create(req.body)
    res.status(StatusCodes.CREATED).json({ field })
  }
}

const updateField = async (req, res) => {
  const {
    user: { userId },
    params: { id: fieldId},
    body: { company, position },
   } = req

  if (!company || !position) {
    throw new BadRequestError('Company or position fields cannot be empty')
  }

  const field = await Field.findByIdAndUpdate(
    {
      _id: fieldId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if(!field) {
    throw new NotFoundError(`No field with id ${fieldId}`)
  }

  res.status(StatusCodes.OK).json({ field })
}

const deleteAllField = async (req, res) => {
  console.log('delete All');

  const fields = await Field.deleteMany({})

  if(!fields) {
    throw new NotFoundError(`No field founded`)
  }

  res.status(StatusCodes.OK).json({ fields })
}

const deleteField = async (req, res) => {
  const { params: { id: fieldId} } = req

  const field = await Field.findByIdAndRemove({
    _id: fieldId,
  })

  if(!field) {
    throw new NotFoundError(`No field with id ${fieldId}`)
  }

  res.status(StatusCodes.OK).json({ field })
}

module.exports = {
  getAllFields,
  getField,
  createField,
  updateField,
  deleteField,
  deleteAllField,
}