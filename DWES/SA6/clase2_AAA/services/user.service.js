const userModel = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')

//Devuelve todos los usuarios (listar)
exports.getAll = async () => await userModel.find()

//Devuelve usuario por username
exports.getByUsername = async usernameParam =>
  await userModel.findOne({ username: usernameParam })

//Crear un nuevo usuario
exports.create = async datos => {
  datos.password = await bcrypt.hashPassword(datos.password)
  const newUser = new userModel(datos)
  return await newUser.save()
}

//Login
exports.login = async (usernameParam, passwordParam) => {
  let userFound = await this.getByUsername(usernameParam)
  if (userFound) {
    const validado = await bcrypt.compareLogin(
      passwordParam,
      userFound.password
    )
    if (validado) {
      return userFound
    } else {
      return null
    }
  } else {
    return null
  }
}
