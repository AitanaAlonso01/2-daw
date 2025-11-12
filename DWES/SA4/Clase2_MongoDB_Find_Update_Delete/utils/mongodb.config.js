require('dotenv').config() // Acceder a variables de entorno (.env)

const mongoose = require('mongoose') // npm i mongoose

exports.conectarMongoDB = async () => {
  return mongoose.connect(process.env.MONGODB_CONSTRING)
}
