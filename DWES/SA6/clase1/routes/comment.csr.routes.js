const commentController = require('../controllers/comment.controller')
const express = require('express')
const router = express.Router()

//Listar
router.get('/', commentController.getAllComments)

//Mostrar
router.get('/:id', commentController.getCommentById)

//Crear
router.post('/', commentController.newComment)

//Editar
router.patch('/:id', commentController.editCommentById)

//Eliminar
router.delete('/:id', commentController.deleteCommentById)

//Exportar rutas
module.exports = router
