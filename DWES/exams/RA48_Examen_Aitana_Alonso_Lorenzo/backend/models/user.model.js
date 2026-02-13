// Modelo: userModel.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
  },
  profile: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
})

const UserModel = mongoose.model('User', userSchema)

UserModel.findAll = async (filter = {}, result) => {
  const datos = await UserModel.find(filter)
  if (datos && datos.length > 0) {
    result(null, datos)
  } else {
    result({ error: 'No hay datos' }, null)
  }
}

UserModel.findUserById = async (id, result) => {
  const datos = await UserModel.findById(id)
  if (datos) {
    result(null, datos)
  } else {
    result({ error: 'No hay datos' }, null)
  }
}

UserModel.updateUserById = async (id, userData, result) => {
  await UserModel.findByIdAndUpdate(id, userData, {
    runValidators: true,
    new: true,
  })
    .then(datosResultado => result(null, datosResultado))
    .catch(err => result(err, null))
}

UserModel.deleteUserById = async (id, result) => {
  await UserModel.findByIdAndDelete(id)
    .then(datos => result(null, datos))
    .catch(err => result(err, null))
}

//Create - register

//Login - find by username??

module.exports = UserModel
