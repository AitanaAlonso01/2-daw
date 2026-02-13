const commentController = require("../controllers/comment.controller")
const express = require("express")
const router = express.Router()



//Mostrar JSON del listado de comentarios
/**
 * @swagger
 * components:
 *   schemas:
 *     EJS:
 *       type: string
 *       example: '<html>Vista EJS</html>'
 *     Comment:
 *       type: object
 *       required:
 *         - usuario
 *         - opinion
 *         - valoracion
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated id of the Comment (UUID)
 *         usuario:
 *           type: string
 *           description: Nombre del usuario que ha escrito el comentario
 *         opinion:
 *           type: string
 *           description: Opinión de varias líneas
 *         categoria:
 *           type: string
 *           description: Categoría del comentario. Es un enumerado con los valores posibles de "deportes", "moda" y "política"
 *         valoracion:
 *           type: integer
 *           description: Número entero, entre 1 y 5, de valoración del comentario
 *       example:
 *         _id: 673f501fd54fa55543090976
 *         usuario: roberto
 *         opinion: lorem ipsum...
 *         categoria: deportes
 *         valoracion: 4
 *     Error:
 *       type: object
 *       properties:
 *         err:
 *           type: string
 *           description: Descripción del error
 *       example:
 *          err: No hay datos disponibles
 */

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: El API de gestión de Comentarios
 */

/**
 * @swagger
 * /api/v2/comments/comentarios/json:
 *   get:
 *     summary: Devuelve el listado de Comentarios en formato JSON
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Listado de comentarios en formato JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error devuelto al ejecutar la consulta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/comentarios/json",commentController.findAllComments)

/**
 * @swagger
 * /api/v2/comments/:
 *   get:
 *     summary: Devuelve el listado de Comentarios mediante una vista EJS
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Listado de comentarios mediante una vista EJS
 *         content:
 *           application/html:
 *             text/html:
 *             schema:
 *               $ref: '#/components/schemas/EJS'
 */
router.get("/",commentController.showAllComments)

/**
 * @swagger
 * /api/v2/comments/comentarios:
 *   get:
 *     summary: Devuelve el listado de Comentarios mediante una vista EJS
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Listado de comentarios mediante una vista EJS
 *         content:
 *           text/html:
 *             schema:
 *               $ref: '#/components/schemas/EJS'
 */
router.get("/comentarios",commentController.showAllComments)



/**
 * @swagger
 * /api/v2/comments/comentarios/new:
 *   get:
 *     summary: Muestra, mediante una vista EJS, el formulario para crear un nuevo comentario
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Muestra, mediante una vista EJS, el formulario para crear un nuevo comentario
 *         content:
 *           text/html:
 *             schema:
 *              $ref: '#/components/schemas/EJS'
 */
router.get("/comentarios/new",commentController.showNewComment)



/**
 * @swagger
 * /api/v2/comments/comentarios/{id}:
 *   get:
 *     summary: Muestra, mediante una vista EJS, el formulario con los detalles de un comentario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del comentario (UUID / _id de MongoDB)
 *     responses:
 *       200:
 *         description: Muestra, mediante una vista EJS, el formulario con los detalles de un comentario
 *         content:
 *           text/html:
 *             schema:
 *              $ref: '#/components/schemas/EJS'
 */
router.get("/comentarios/:id",commentController.showCommentById)


/**
 * @swagger
 * /api/v2/comments/comentarios/{id}/edit:
 *   get:
 *     summary: Muestra, mediante una vista EJS, el formulario para poder editar el comentario seleccionado
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del comentario (UUID / _id de MongoDB)
 *     responses:
 *       200:
 *         description: Muestra, mediante una vista EJS, el formulario para poder editar el comentario seleccionado
 *         content:
 *           text/html:
 *             schema:
 *              $ref: '#/components/schemas/EJS'
 */
router.get("/comentarios/:id/edit",commentController.showEditComment)


/**
 * @swagger
 * /api/v2/comments/comentarios:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentario creado en MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error devuelto al ejecutar la consulta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/comentarios",commentController.createComment)



/**
 * @swagger
 * /api/v2/comments/comentarios/{id}:
 *   patch:
 *     summary: Actualiza un nuevo comentario a partir de su ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del comentario (UUID / _id de MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentario actualizado en MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error devuelto al ejecutar la consulta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/comentarios/:id",commentController.editComment)



/**
 * @swagger
 * /api/v2/comments/comentarios/{id}:
 *   delete:
 *     summary: Elimina un comentario, a partir de su ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del comentario (UUID / _id de MongoDB)
 *     responses:
 *       200:
 *         description: Comentario creado en MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error devuelto al ejecutar la consulta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/comentarios/:id",commentController.deleteComment)





module.exports = router