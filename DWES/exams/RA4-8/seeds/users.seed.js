require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const seedDB = async () => {
  await mongoose.connect(process.env.MONGODB_CONSTRING)

  // Limpiamos la base de datos de usuarios
  await User.deleteMany({})

  // Creamos un usuario de prueba con contraseña encriptada
  const hashedPassword = await bcrypt.hash('1234', 10)

  const usuariosIniciales = [
    { username: 'admin', password: hashedPassword, role: 'admin' },
    { username: 'alumno', password: hashedPassword, role: 'user' },
  ]

  await User.insertMany(usuariosIniciales)
  console.log('¡Base de datos poblada con éxito!')
  process.exit()
}

seedDB()

// Para ejecutar el seed de la base de datos
// node seeds/users.seed.js
