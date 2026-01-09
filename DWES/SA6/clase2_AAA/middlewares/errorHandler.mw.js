const logger = require('../utils/logger')

exports.errorHandler = (err, req, res, next) => {
  let { status = 500, message = 'Internal Server Error' } = err
  console.log('DENTRO DEL ERROR HANDLER')
  console.log(err.name)
  console.log(err.code)

  if (err.name === 'ValidationError') {
    status = 400
  }

  if (err.name === 'MongoServerError') {
    status = 400
    if (err.code === 11000) {
      // Clave duplicada
      status = 406 // Not Acceptable
      message = 'Clave duplicada espabila colega'
    }
  }

  logger.error.error(`Error handler (${status}): ${message}`)
  res.status(status).json({ err: message })
}
