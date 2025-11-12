const CommentService = require('../services/comment.service')
const CategoriaService = require('../services/categoria.service')

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
  res.render('new.ejs', { categorias: CategoriaService.getAll() })
}

exports.createComment = async (req, res) => {
  //const { usuario, opinion } = req.body
  //const datosComentario = { usuario, opinion }
  await CommentService.create(req.body)
  res.redirect('/comentarios')
}

exports.showEditComment = async (req, res) => {
  const { id } = req.params
  const comentario = await CommentService.getById(id)
  if (comentario) {
    res.locals.tituloEJS = 'Editar'
    res.render('edit.ejs', {
      comentario,
      categorias: CategoriaService.getAll(),
    })
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

exports.editComment = async (req, res) => {
  const { id } = req.params
  const CommentUpdated = await CommentService.update(id, req.body)
  if (CommentUpdated) {
    res.redirect('/comentarios')
  } else {
    res.status(500).json('ERROR al actualizar comentario')
  }
}

exports.deleteComment = async (req, res) => {
  const { id } = req.params
  const CommentDeleated = await CommentService.remove(id)
  if (CommentDeleated) {
    res.redirect('/comentarios')
  } else {
    res.status(500).json('ERROR al eliminar comentario')
  }
}

exports.findCommentByUser = async (req, res) => {
  const { q } = req.query
  const comentario = await CommentService.getByUser(q)
  if (comentario) {
    res.status(200).json(comentario)
  } else {
    res.status(404).json('Comentario por usuario no encontrado')
  }
}
