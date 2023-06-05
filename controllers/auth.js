const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and login')
  // }

  const user = await User.create({
    ...req.body,
  })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token })
}

const login = async (req, res) => {
  // res.send('login user')
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  console.log('user.name :>> ', user.name);
  console.log('user.email :>> ', user.email);
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  console.log('user exist');

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
  console.log('token :>> ', token);
  const result = { user: { name: user.getName()}, token}
  console.log('result :>> ', result);
  res.status(StatusCodes.OK).json(result)


}

module.exports = {
  register,
  login
}