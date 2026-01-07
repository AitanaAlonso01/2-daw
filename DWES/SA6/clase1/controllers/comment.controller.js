const CommentService = require('../services/comment.service')
const CategoriasService = require('../services/categoria.service')

exports.findAllComments = async (req, res) => {
  const { cat } = req.query
  let comentarios = []
  if (cat) {
    comentarios = await CommentService.getByCat(cat)
  } else {
    comentarios = await CommentService.getAll()
  }
  if (comentarios.length > 0) {
    res.locals.tituloEJS = 'Listado'
    res.render('index.ejs', {
      comentarios,
      categorias: await CategoriasService.getAll(),
    })
  } else {
    res.status(404).json('Sin comentarios...')
  }
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

exports.showNewComment = async (req, res) => {
  res.locals.tituloEJS = 'Nuevo'
  res.render('new.ejs', { categorias: await CategoriasService.getAll() })
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
  console.log(comentario)
  if (comentario) {
    res.locals.tituloEJS = 'Editar'
    res.render('edit.ejs', {
      comentario,
      categorias: await CategoriasService.getAll(),
    })
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

exports.editComment = async (req, res) => {
  const { id } = req.params
  const commmentUpdated = await CommentService.update(id, req.body)
  if (commmentUpdated) {
    res.redirect('/comentarios')
  } else {
    res.status(500).json('ERROR al actualizar')
  }
}

exports.deleteComment = async (req, res) => {
  const { id } = req.params
  const commentDeleted = await CommentService.remove(id)
  if (commentDeleted) {
    res.redirect('/comentarios')
  } else {
    res.status(500).json('ERROR al eliminar')
  }
}

exports.findCommentByUser = async (req, res) => {
  const { q } = req.query
  const comentario = await CommentService.getByUser(q)
  if (comentario) {
    res.status(200).json(comentario)
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

//--------------------------------------------------------------------------------------
//CSR
//--------------------------------------------------------------------------------------

// Listar
exports.getAllComments = async (req, res) => {
  const { cat } = req.query
  let comentarios = []
  if (cat) {
    comentarios = await CommentService.getByCat(cat)
  } else {
    comentarios = await CommentService.getAll()
  }
  if (comentarios.length > 0) {
    res.status(200).json(comentarios)
  } else {
    res.status(404).json('Sin comentarios...')
  }
}

// Mostrar
exports.getCommentById = async (req, res) => {
  const { id } = req.params
  const comentario = await CommentService.getById(id)
  if (comentario) {
    res.status(200).json(comentario)
  } else {
    res.status(404).json('Comentario no encontrado')
  }
}

// Crear
exports.newComment = async (req, res) => {
  const comentarioCreado = await CommentService.create(req.body)
  if (comentarioCreado) {
    res.status(201).json(comentarioCreado)
  } else {
    res.status(500).json('ERROR al crear')
  }
}

// Editar
exports.editCommentById = async (req, res) => {
  const { id } = req.params
  const comentarioEditado = await CommentService.update(id, req.body)
  if (comentarioEditado) {
    res.status(200).json(comentarioEditado)
  } else {
    res.status(500).json('ERROR al editar')
  }
}

// Eliminar
exports.deleteCommentById = async (req, res) => {
  const { id } = req.params
  const comentarioEliminado = await CommentService.remove(id)
  if (comentarioEliminado) {
    res.status(200).json(comentarioEliminado)
  } else {
    res.status(500).json('ERROR al eliminar')
  }
}
