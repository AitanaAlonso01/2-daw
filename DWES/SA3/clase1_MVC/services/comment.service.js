let comentarios = require('../models/comment.model.json')

// Devolver todos los comentarios
exports.getAll = () => comentarios

// Devolver un comentario por id
exports.getById = id => comentarios.find(c => c.id == id)

// Crear un nuevo comentario
exports.create = datos => {
  datos.id = comentarios.length + 1
  comentarios.push(datos)
  return datos
}
