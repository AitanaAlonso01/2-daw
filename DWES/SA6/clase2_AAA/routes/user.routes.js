const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

// Rutas
// listar todos los usuarios
router.get('/', userController.getAllUsers)

// registar usuario
router.post('/', userController.registerUser)

// login
router.post('/login', userController.loginUser)

// Exportar rutas
module.exports = router
