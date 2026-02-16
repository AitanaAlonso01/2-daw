const jwt = require('jsonwebtoken')

exports.validarJWT = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    // Si es una ruta de API (React), mandamos JSON.
    // Si es una ruta de EJS, podrías redirigir al login.
    return res
      .status(401)
      .json({ mensaje: 'No autorizado. Por favor, inicia sesión.' })
  }

  try {
    const decoded = jwt.verify(token, 'SECRETO_DEL_EXAMEN')
    req.user = decoded // Aquí guardamos id y profile
    next()
  } catch (error) {
    res.clearCookie('token')
    return res.status(401).json({ mensaje: 'Sesión expirada o inválida.' })
  }
}

exports.esAdmin = (req, res, next) => {
  // Según tu Atlas, el campo es 'profile' y el valor 'ADMIN'
  if (!req.user || req.user.profile !== 'ADMIN') {
    return res
      .status(403)
      .json({
        mensaje: 'Acceso denegado: Se requieren permisos de ADMINISTRADOR.',
      })
  }
  next()
}
