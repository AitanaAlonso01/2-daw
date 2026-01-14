const userModel = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()

//Crear un nuevo usuario
exports.create = async datos => {
  datos.password = await bcrypt.hashPassword(datos.password)
  const newUser = new userModel(datos)
  return await newUser.save()
}

// exports.getByUsername = async usernameParam =>
//   await userModel.findOne({ username: usernameParam })

exports.login = async (usernameParam, passwordParam) => {
  const userFound = await userModel
    .findOne({ username: usernameParam })
    .select('+password') //await this.getByUsername(usernameParam)
  if (userFound) {
    console.log(userFound)
    const validado = await bcrypt.compareLogin(
      passwordParam,
      userFound.password
    )
    if (validado) {
      //JWT: Crear token INI (bloque de creación d token y devolución al usuario)
      const token = jwt.sign(
        {
          //payload: datos a partir de os cuales se va a generar el churro - manda información no comprometida
          _id: userFound._id,
          username: userFound.username,
          profile: userFound.profile,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h', //3600s = 1h
        }
      )
      const user = userFound.toObject()
      delete user.password //eliminar el password del objeto
      return { user, token }
      //JWT: Crear token FIN
    } else {
      return null
    }
  } else {
    return null
  }
}

//Mostrar usuario por id
exports.getById = async (idParam, req) => {
  const userFound = await userModel.findById(idParam)
  if (userFound) {
    return userFound
  } else {
    return null
  }
}
