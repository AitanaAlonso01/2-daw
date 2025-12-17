const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()

//Mostrar JSON del listado de comentarios
router.get("/comentarios/json",commentController.findAllComments)
//Mostrar VISTA EJS index.ejs con listado de comentarios
router.get("/",commentController.showAllComments)
router.get("/comentarios",commentController.showAllComments)
//Mostrar VISTA EJS new.ejs para crear un comentario
router.get("/comentarios/new",commentController.showNewComment)
//Mostrar VISTA EJS show.ejs para mostrar detalles de un comentario
router.get("/comentarios/:id",commentController.showCommentById)
//Mostrar VISTA EJS edit.ejs para mostrar detalles de un comentario y poder editarlos
router.get("/comentarios/:id/edit",commentController.showEditComment)

//POST - Crear comentario
router.post("/comentarios",commentController.createComment)

//PATCH - Editar comentario
router.patch("/comentarios/:id",commentController.editComment)

//DELETE - Eliminar comentario
router.delete("/comentarios/:id",commentController.deleteComment)


//GET *
//router.get("*",commentController.otherSites)


module.exports = router