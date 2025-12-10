const commentController = require('../controllers/comment.controller')
const express = require('express')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - usuario
 *         - opinion
 *         - categoria
 *         - valoracion
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB (ObjectId)
 *           example: "67a1b2c3d4e5f67890123456"
 *         usuario:
 *           type: string
 *           description: Nombre del usuario que comenta
 *           example: "Aitana"
 *         opinion:
 *           type: string
 *           description: Texto de la opinión del usuario
 *           example: "La experiencia fue excelente"
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         valoracion:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: Valoración numérica del 0 al 5
 *           example: 4
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: Comentario no encontrado
 *         details:
 *           type: string
 *           nullable: true
 *           example: "El ID proporcionado no existe en la base de datos"
 *
 *     Categoria:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB (ObjectId)
 *           example: "67a1b2c3d4e5f67890123456"
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría (siempre en minúsculas)
 *           example: "aventura"
 */

//Listar
/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Obtener todos los comentarios (opcionalmente filtrados por categoría)
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No se encontraron comentarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', commentController.getAllComments)

//Mostrar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Obtener un comentario por su ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', commentController.getCommentById)

//Crear
/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', commentController.newComment)

//Editar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   patch:
 *     summary: Editar un comentario existente
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id', commentController.editCommentById)

//Eliminar
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario por su ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comentario eliminado"
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', commentController.deleteCommentById)

//Exportar rutas
module.exports = router
