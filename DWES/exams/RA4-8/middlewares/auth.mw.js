const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

exports.protagonista = (req, res, next) => {
  // 1. Intentamos pillar el token de la cookie
  const token = req.cookies.token

  // 2. Si no hay token, no pasa
  if (!token) {
    return next(
      new AppError('No estás logueado. Por favor, inicia sesión.', 401)
    )
  }

  try {
    // 3. Verificamos si el token es válido y no ha expirado
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardamos los datos del usuario en la petición por si los necesitamos luego
    req.user = decoded

    next() // ¡Adelante!
  } catch (err) {
    return next(new AppError('Token inválido o expirado.', 401))
  }
}
