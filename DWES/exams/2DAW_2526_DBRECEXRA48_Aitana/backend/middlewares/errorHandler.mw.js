//TO DO - 5 protección síncrona y asíncrona de errores
const AppError = require('../utils/AppError')
const logger = require('../utils/logger')

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    })
  }

  logger.error(err)
  res.status(500).json({
    success: false,
    message: 'Ha ocurrido un error interno en el servidor',
  })
}
