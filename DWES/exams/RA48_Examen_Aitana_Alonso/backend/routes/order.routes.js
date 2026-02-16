const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const auth = require('../middlewares/auth.mw') // Importamos nuestro portero

// RUTAS ABIERTAS (Según el PDF)
router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)

// RUTAS PROTEGIDAS (Solo usuarios logueados pueden crear/modificar pedidos)
// Usamos validarJWT para asegurar que tienen carnet de identidad (Token)
router.post('/', auth.validarJWT, orderController.create)
router.put('/:id', auth.validarJWT, orderController.update)
router.delete('/:id', auth.validarJWT, orderController.remove)

module.exports = router
