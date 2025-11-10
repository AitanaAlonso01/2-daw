let comentarios = require('../models/comment.model.json')
const commentModel = require('../models/comment.model')

//Devolver todos los comentarios
exports.getAll = async () => await commentModel.find() // SELECT * FROM Comments

//Devolver un comentario por ID
exports.getById = async id => await commentModel.findById(id) // SELECT * FROM Comments WHERE id = _id

//Crear un nuevo comentario
exports.create = async datos => {
  // datos.id = comentarios.length + 1
  // comentarios.push(datos)
  // return datos
  const newComment = new commentModel(datos)
  await newComment.save() // INSERT (SQL) - InsertOne (MongoDB alternative)
  // .then(datos => {})
  // .catch(err => {})
}

//Edita un comentario existente
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

//Elimina un comentario
exports.remove = id => {
  comentarios = comentarios.filter(c => c.id != id)
  return comentarios
}
