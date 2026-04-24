const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()
//TO DO - 3 Protección de rutas JWT y/o filtrar por perfil

//TO DO 1 Register
//GET Show EJS
//POST user

//TO DO 2 Login
//GET Show EJS
router.get('/login', userController.showLogin)

//POST login user
router.post('/login', userController.loginUser)

router.post('/logout', userController.logoutUser)

// Rutas de usuarios - Dinamicas bajo de los de get y post de login, register y logout
router.get('/', userController.getAllUsers)

router.get('/me', userController.getLoguedUser)

router.get('/:id', userController.getUserById)

//Exportar rutas
module.exports = router
