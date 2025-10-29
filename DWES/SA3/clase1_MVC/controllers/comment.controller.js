// único archivo que usa los req y res
const CommentService = require('../services/comment.service')

// el controller se puede apoyar de vistas o JSON
exports.findAllComments = (req, res) => {
  const comentarios = CommentService.getAll()
  res.render('index.ejs', { comentarios })
}

exports.findCommentById = (req, res) => {
  const { id } = req.params
  const comentario = CommentService.getById(id)
  if (comentario) {
    res.render('show.ejs', { comentario })
  } else {
    res.status(404).json('Comentario no encontrado') // devolvemos un mensaje de error por JSON
  }
}

exports.showNewComment = (req, res) => {
  res.render('new.ejs')
}

exports.createComment = (req, res) => {
  CommentService.create(req.body)
  res.redirect('/comentarios')
}

exports.showEditComment = (req, res) => {
  const { id } = req.params
  const comentario = CommentService.getById(id) // cargamos el comentario
  if (comentario) {
    res.render('edit.ejs', { comentario })
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

exports.editComment = (req, res) => {
  const { id } = req.params
  CommentService.update(id, req.body) // actualizamos el comentario
  res.redirect('/comentarios') // redirigimos al listado de comentarios
}

exports.deleteComment = (req, res) => {
  const { id } = req.params
  CommentService.delete(id) // eliminamos el comentario
  res.redirect('/comentarios') // redirigimos al listado de comentarios
}
