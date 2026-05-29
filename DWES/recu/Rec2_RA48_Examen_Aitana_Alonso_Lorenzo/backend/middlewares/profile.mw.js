//TO DO - 3 restrict to profiles
const AppError = require('../utils/AppError')

//Función para restringir ciertas rutas a sólo ciertos perfiles
exports.restrictTo = (...profiles) => {
  return (req, res, next) => {
    const usuario = req.user //req.user tiene la información PAYLOAD decodificada en el token de la cookie (_id, username, profile)
    //Comprobamos el campo profile para saber si es ADMIN o USER
    if (!usuario || !profiles.includes(usuario.profile)) {
      return next(new AppError('No tienes permisos', 403))
    }
    next()
  }
}
