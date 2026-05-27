const user = require('../models/user.model')
const userService = require('../services/user.service')
//TO DO - 5 protección síncrona y asíncrona de errores
const AppError = require('../utils/AppError')

//Zustand
exports.getLoguedUser = (req, res, next) => {
  // authMiddleware ya validó la cookie y puso req.user
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: 'No estás logueado' })

  res.json({
    success: true,
    user: req.user,
  })
}

exports.getAllUsers = async (req, res) => {
  let users = await userService.getAll()

  if (users.length > 0) {
    res.status(200).json(users)
  } else {
    res.status(401).json({ msg: 'Sin usuarios' })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  const user = await userService.getById(id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(401).json({ msg: 'Sin usuario encontrado con ese id' })
  }
}

//TO DO 1 Register

//TO DO 2 Login
exports.showLogin = (req, res) => {
  res.render('login')
}

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body
  //Prueba de que llega hasta el loginUser
  // res.status(200).json({ username, password })
  const userLogued = await userService.login(username, password)
  if (userLogued) {
    res.json(userLogued)
  } else {
    next(new AppError('Usuario o contraseña incorrectos', 401))
  }
}

//Zustand
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente',
    })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
