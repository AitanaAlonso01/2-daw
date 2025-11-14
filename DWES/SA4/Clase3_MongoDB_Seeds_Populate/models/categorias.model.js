const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
  //_id --> ID UUID (como la PK) - NO es un String. Se genera automáticamente
  nombre: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
})

//Creamos el MODELO a partir del ESQUEM MONGOOSE
const categorias = mongoose.model('categorias', catSchema)

//Exportamos para poderlo usar en el SERVICE
module.exports = categorias
