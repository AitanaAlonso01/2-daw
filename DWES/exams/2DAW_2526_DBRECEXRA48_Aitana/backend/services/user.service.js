const userModel = require('../models/user.model')

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()
//Get User By Id
exports.getById = async id => await userModel.findById(id)

//Crear un nuevo usuario
//TO DO 1 Register (Validando y encriptando contraseña)
exports.create = async datos => {
  const newUser = new userModel(datos)
  return await newUser.save()
}

//TO DO 2 Login (Guardando usuario en cookie / sessión)
exports.login = async (email, password) => {
  const user = await userModel.findOne({ email })
  if (!user) {
    return null
  }
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return null
  }
  return user
}
