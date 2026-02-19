const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

//TO DO 1 Register
//GET Show EJS
router.get('/register', userController.renderRegister)
//POST user
router.post('/register', userController.register)

//TO DO 2 Login
//GET Show EJS
router.get('/login', userController.renderLogin)
//POST login user
router.post('/login', userController.login)

router.post('/logout', userController.logoutUser)

//TO DO - 3 Protección de rutas JWT y/o filtrar por perfil

router.get('/', userController.getAllUsers)

router.get('/me', userController.getLoguedUser)

router.get('/:id', userController.getUserById)

//Exportar rutas
module.exports = router
