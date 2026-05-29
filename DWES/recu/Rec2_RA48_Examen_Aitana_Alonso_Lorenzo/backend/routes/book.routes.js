const bookController = require('../controllers/book.controller')
const express = require('express')
const router = express.Router()
//TO DO - 3 Protección de rutas JWT y/o filtrar por perfil
const { protect } = require('../middlewares/jwt.mw') //Sólo necesita estar logueado
const { restrictTo } = require('../middlewares/profile.mw') //Debes estar logueado y tener cierto PROFILE

// Obtener todos los libros
router.get('/', bookController.getAllBooks)

// Obtener un libro por ID
router.get('/:id', bookController.getBookById)

// Crear un libro
router.post('/', protect, restrictTo('ADMIN'), bookController.createBook)

// Eliminar un libro
router.delete('/:id', protect, restrictTo('ADMIN'), bookController.deleteBook)

module.exports = router
