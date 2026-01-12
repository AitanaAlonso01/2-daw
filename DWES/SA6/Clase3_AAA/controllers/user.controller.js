const userService = require('../services/user.service')
const { wrapAsync } = require('../utils/functions')
const AppError = require('../utils/AppError')

exports.getAllUsers = wrapAsync(async (req, res, next) => {
  let users = await userService.getAll()

  if (users.length > 0) {
    res.status(200).json(users)
  } else {
    next(new AppError('Sin usuarios', 404))
  }
})

exports.registerUser = wrapAsync(async (req, res, next) => {
  const usuarioCreado = await userService.create(req.body)
  if (usuarioCreado) {
    req.session.user = {
      id: usuarioCreado._id,
      username: usuarioCreado.username,
      role: usuarioCreado.profile,
    }
    // res.status(200).json(userLogued)
    res.redirect(res.locals.baseUrlUsers)
    // res.status(200).json(usuarioCreado)
  } else {
    next(new AppError('Error al registrar el usuario', 400)) //BAD REQUEST
  }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { username, password } = req.body
  const userLogued = await userService.login(username, password)
  if (userLogued) {
    //GUARDAR los datos minimos en la sesion
    req.session.user = {
      id: userLogued._id,
      username: userLogued.username,
      role: userLogued.profile,
    }
    // res.status(200).json(userLogued)
    res.redirect(res.locals.baseUrlUsers)
  } else {
    next(new AppError('Usuario y/o contraseña incorrectos', 401))
  }
})

exports.showLogin = (req, res) => {
  res.render('user/login')
}

exports.showRegister = (req, res) => {
  res.render('user/register')
}

//Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect(res.locals.baseUrlUsers + '/login')
  })
}
