// let comentarios = require('../models/comment.model.json')
const commentModel = require('../models/comment.model')

//Devolver todos los comentarios
exports.getAll = async () => await commentModel.find() // SELECT * FROM Comments

//Devolver un comentario por ID
exports.getById = async id => await commentModel.findById(id) // SELECT * FROM Comments WHERE _id = id

// Buscar comentarios por usuario
exports.getByUser = async user => await commentModel.find({ usuario: user })

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
exports.update = async (id, datos) => {
  // const comentario = comentarios.find(c => c.id == id)
  // if (!comentario) {
  //   return null
  // } else {
  //   comentario.usuario = datos.usuario
  //   comentario.opinion = datos.opinion
  //   return comentario
  // }
  return await commentModel.findByIdAndUpdate(id, datos, { new: true }) // UPDATE Comments SET ... WHERE _id = id
}

//Elimina un comentario
exports.remove = async id => {
  // comentarios = comentarios.filter(c => c.id != id)
  // return comentarios
  return await commentModel.findByIdAndDelete(id) // DELETE FROM Comments WHERE _id = id
}
