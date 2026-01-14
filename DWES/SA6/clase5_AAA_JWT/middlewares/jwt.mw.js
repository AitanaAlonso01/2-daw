require('dotenv').config() //npm i dotenv
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

exports.protect = (req, res, next) => {
  let token = null

  // destripamos el token de la cabecera de autorización
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1] //Bearer <token>
  }

  if (!token) {
    return next(new AppError('No autenticado', 401))
  }

  try {
    //Validamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded //payload -> {id,username,profile}
    next() //TODO OK --> Validado
  } catch (error) {
    next(new AppError(`Token inválido o expirado. Desc: ${error}`, 401))
  }
}
