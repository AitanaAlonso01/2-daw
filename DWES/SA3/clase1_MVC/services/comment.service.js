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

// Update un comentario
exports.update = (id, datos) => {
  const comentario = comentarios.find(c => c.id == id)
  if (!comentario) {
    return null
  } else {
    comentario.usuario = datos.usuario
    comentario.opinion = datos.opinion
    return comentario
  }
}

// Eliminar un comentario
exports.delete = id => {
  comentarios = comentarios.filter(c => c.id != id) // crea un array nuevo sin el comentario que queremos eliminar
  return comentarios
}
