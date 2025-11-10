const CommentService = require('../services/comment.service')

exports.findAllComments = async (req, res) => {
  const comentarios = await CommentService.getAll()
  res.locals.tituloEJS = 'Listado'
  res.render('index.ejs', { comentarios })
}

exports.findCommentById = async (req, res) => {
  const { id } = req.params
  const comentario = await CommentService.getById(id)
  if (comentario) {
    res.locals.tituloEJS = 'Detalles'
    res.render('show.ejs', { comentario })
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

exports.showNewComment = (req, res) => {
  res.locals.tituloEJS = 'Nuevo'
  res.render('new.ejs')
}

exports.createComment = async (req, res) => {
  //const { usuario, opinion } = req.body
  //const datosComentario = { usuario, opinion }
  await CommentService.create(req.body)
  res.redirect('/comentarios')
}

exports.showEditComment = (req, res) => {
  const { id } = req.params
  const comentario = CommentService.getById(id)
  if (comentario) {
    res.locals.tituloEJS = 'Editar'
    res.render('edit.ejs', { comentario })
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

exports.editComment = (req, res) => {
  const { id } = req.params
  CommentService.update(id, req.body)
  res.redirect('/comentarios')
}

exports.deleteComment = (req, res) => {
  const { id } = req.params
  CommentService.remove(id)
  res.redirect('/comentarios')
}
