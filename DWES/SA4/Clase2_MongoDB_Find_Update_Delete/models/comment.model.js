const categorias = require('./categorias.model.json')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  // _id --> ID UUID (como la PK) - NO es un string. Se genera automáticamente.
  usuario: {
    type: String,
    required: true, // Requerido (NOTNULL)
  },
  opinion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    lowercase: true,
    enum: categorias,
  },
  valoracion: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
})

// Creamos el modelo a partir del esquema
const comment = mongoose.model('comment', commentSchema)

// Exportamos para poderlo usar en el SERVICIO
module.exports = comment
