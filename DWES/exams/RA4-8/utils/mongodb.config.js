const mongoose = require('mongoose')

const conectarMongoDB = async () => {
  try {
    // Usamos la variable que apunta a Atlas
    await mongoose.connect(process.env.MONGODB_CONSTRING)
    console.log('Conectado con MongoDB Atlas con éxito')
  } catch (err) {
    console.log(`Error al conectar con MongoDB. Desc: ${err}`)
    process.exit(0) // Si falla la conexión, tumbamos el servidor
  }
}

module.exports = { conectarMongoDB }
