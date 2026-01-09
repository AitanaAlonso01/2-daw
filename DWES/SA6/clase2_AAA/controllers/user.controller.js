const userService = require('../services/user.service')
const { wrapAsync } = require('../utils/functions')
const AppError = require('../utils/appError')

exports.getAllUsers = wrapAsync(async (req, res, next) => {
  let users = await userService.getAll()

  if (users.length > 0) {
    res.status(200).json(users)
  } else {
    next(new AppError('Sin usuarios', 404))
  }
})

exports.registerUser = wrapAsync(async (req, res, next) => {
  let usuarioCreado = await userService.create(req.body)

  if (usuarioCreado) {
    res.status(201).json(usuarioCreado)
  } else {
    next(new AppError('Error al registrar al usuario', 500)) //BAD REQUEST
  }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { username, password } = req.body
  const userLogued = await userService.login(username, password)

  if (userLogued) {
    res.status(200).json(userLogued)
  } else {
    next(new AppError('Usuario y/o contraseña incorrectos', 401))
  }
})
