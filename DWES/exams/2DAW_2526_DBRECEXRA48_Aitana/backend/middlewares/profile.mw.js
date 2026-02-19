//TO DO - 3 restrict to profiles
exports.esAdmin = (req, res, next) => {
  // Según tu Atlas, el campo es 'profile' y el valor 'ADMIN'
  if (!req.user || req.user.profile !== 'ADMIN') {
    return res.status(403).json({
      mensaje: 'Acceso denegado: Se requieren permisos de ADMINISTRADOR.',
    })
  }
  next()
}
