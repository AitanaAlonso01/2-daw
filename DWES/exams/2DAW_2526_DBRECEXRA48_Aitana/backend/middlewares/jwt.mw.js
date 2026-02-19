//TO DO - 3 JWT Protect
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

module.exports = (req, res, next) => {
  const token = req.cookies.token
  if (token) {
    try {
      const decoded = jwt.verify(token, 'SECRETO_DEL_EXAMEN')
      req.user = decoded
      next()
    } catch (e) {
      throw new AppError('No tienes permisos para acceder a esta ruta', 401)
    }
  } else {
    throw new AppError('No tienes permisos para acceder a esta ruta', 401)
  }
}
