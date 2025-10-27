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
