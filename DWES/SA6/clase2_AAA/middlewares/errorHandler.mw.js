const logger = require('../utils/logger')

exports.errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Internal Server Error' } = err
  console.log('DENTRO DEL ERROR HANDLER')
  logger.error.error(`Error handler (${status}): ${message}`)
  res.status(status).json({ err: message })
}
