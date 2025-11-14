const catController = require('../controllers/categorias.controller')
const express = require('express')
const router = express.Router()

// CRUD
router.get('/', catController.getAllCategorias)
router.get('/:id', catController.getByIdCategoria)
router.post('/', catController.createCategoria)
router.put('/:id', catController.updateCategoria)
router.delete('/:id', catController.deleteCategoria)

module.exports = router
