//TO DO - 5 protección síncrona y asíncrona de errores
const logger = require("../utils/logger")

exports.errorHandler = (err,req,res,next) => {
    let { status, message } = err

    logger.error.error(message)

    res.status(status).json({error:message})
}