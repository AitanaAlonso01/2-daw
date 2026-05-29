//TO DO - 3 JWT Protect
//TO DO - 3 JWT Protect
require('dotenv').config()
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

//Función para proteger rutas
exports.protect = (req, res, next) => {
  console.log('Cookies recibidas:', req.cookies)
  console.log('Header Authorization:', req.headers.authorization)
  let token = null

  //Busca el token por si está en el Bearer (no va a ser así en nuestra aplicación)
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  //Busca el token guardado en una COOKE (aquí sí va a ser el caso)
  if (!token && req.cookies?.token) {
    //Extraemos el token de la cookie
    token = req.cookies.token
  }

  if (!token) {
    //Si no hubiera, ¡no puedes pasar! sin iniciar sesión
    return next(
      new AppError(
        'No tienes permiso para acceder. Por favor, inicia sesión.',
        401
      )
    )
  }

  try {
    //Validar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) //Para verificar el token, necesitamos la misma CLAVE con la que lo creamos (firmamos)
    //Guardamos la información del PAYLOAD en el req.user (un objeto inventado en el request para poderlo usar en el siguiente middleware "restrictTo")
    req.user = decoded //payload --> obtenemos la información decodificada del usuario logueado. La que guardamos al hacer login en PAYLOAD {id,username,profile}
    next() //TODO OK --> Validado
  } catch (error) {
    next(new AppError('Token invalido o expirado. Desc: ' + error, 401))
  }
}
