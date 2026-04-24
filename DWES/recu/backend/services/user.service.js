const userModel = require('../models/user.model')
const { compareLogin } = require('../utils/bcrypt')

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()
//Get User By Id
exports.getById = async id => await userModel.findById(id)

//Crear un nuevo usuario
//TO DO 1 Register (Validando y encriptando contraseña)

//TO DO 2 Login (Guardando usuario en cookie / sessión)
exports.login = async (usernameParam, passwordParam) => {
  const userFound = await userModel.findOne({ username: usernameParam })
  if (userFound) {
    // Comparamos con bcrypt
    const validado = await compareLogin(passwordParam, userFound.password)
    if (validado) {
      // Validamos el usuario
      return userFound
    } else {
      // No es el usuario
      return null
    }
  } else {
    // No encontramos el usuario
    return null
  }
}
