const Tree = require('../models/Tree')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const getAllTrees = async (req, res) => {
  const trees = await Tree.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ trees, count: trees.length })
}

const getTree = async (req, res) => {
  const { params: { id: treeId} } = req

  const tree = await Tree.findOne({
    _id: treeId,
  })

  if(!tree) {
    throw new NotFoundError(`No tree with id ${treeId}`)
  }
  res.status(StatusCodes.OK).json({ tree })
}

const createTree = async (req, res) => {
  const { height, width } = req.body

  if (height && width) {
    const trees = []
    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        const tree = await Tree.create({ x:i, y: j})
        trees.push(tree)
      }
    }
    res.status(StatusCodes.CREATED).json({ count: trees.length, trees })
  } else {
    const tree = await Tree.create(req.body)
    res.status(StatusCodes.CREATED).json({ tree })
  }
}

const updateTree = async (req, res) => {
  const {
    user: { userId },
    params: { id: treeId},
    body: { company, position },
   } = req

  if (!company || !position) {
    throw new BadRequestError('Company or position trees cannot be empty')
  }

  const tree = await Tree.findByIdAndUpdate(
    {
      _id: treeId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if(!tree) {
    throw new NotFoundError(`No tree with id ${treeId}`)
  }

  res.status(StatusCodes.OK).json({ tree })
}

const deleteAllTree = async (req, res) => {
  console.log('delete All');

  const trees = await Tree.deleteMany({})

  if(!trees) {
    throw new NotFoundError(`No tree founded`)
  }

  res.status(StatusCodes.OK).json({ trees })
}

const deleteTree = async (req, res) => {
  const { params: { id: treeId} } = req

  const tree = await Tree.findByIdAndRemove({
    _id: treeId,
  })

  if(!tree) {
    throw new NotFoundError(`No tree with id ${treeId}`)
  }

  res.status(StatusCodes.OK).json({ tree })
}

module.exports = {
  getAllTrees,
  getTree,
  createTree,
  updateTree,
  deleteTree,
  deleteAllTree,
}