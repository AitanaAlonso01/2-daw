const protectMW = require('../middlewares/protect.mw')
const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

router.get('/register', userController.showRegister)
router.get('/login', userController.showLogin)

//Listar todos los usuarios
router.get('/', protectMW.isAuthenticated, userController.getAllUsers)
//Crear/Registrar un nuevo usuario
router.post('/', userController.registerUser)
//Login
router.post('/login', userController.loginUser)
//Logout
router.get('/logout', userController.logoutUser)

//Exportar rutas
module.exports = router
