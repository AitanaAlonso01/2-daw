const commentController = require('../controllers/comment.controller')
const express = require('express')
const router = express.Router()

// Mostrar VISTA EJS index.ejs con listado de comentarios
router.get('/', commentController.findAllComments)

//Mostrar VISTA EJS new.ejs para crear un nuevo comentario
router.get('/new', commentController.showNewComment)
router.post('/', commentController.createComment) // POST - Crear un nuevo comentario

// Mostrar VISTA EJS show.ejs con un comentario específico
router.get('/:id', commentController.findCommentById)

// Mostrar VISTA EJS edit.ejs para editar un comentario (GET)
router.get('/:id/edit', commentController.showEditComment)

// PATCH - Updatear un comentario
router.patch('/:id', commentController.editComment)

// DELETE - Eliminar un comentario
router.delete('/:id', commentController.deleteComment)

//Exportar rutas para poder usar en el servidor - Siempre debe exportar las rutas (mejor al final del archivo)
module.exports = router
