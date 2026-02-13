exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // Si la petición viene de React (espera JSON)
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  // Si la petición viene de EJS (espera una vista de error)
  res.status(err.statusCode).render('error', {
    tituloEJS: 'Error',
    message: err.message,
  })
}
