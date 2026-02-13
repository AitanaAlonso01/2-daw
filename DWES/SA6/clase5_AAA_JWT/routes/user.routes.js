const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()
//JWT: Proteger rutas
const { protect } = require('../middlewares/jwt.mw')
const { restrictTo } = require('../middlewares/profile.ms')
//const jwtMW = require('../middlewares/jwt.mw')

//Listar todos los usuarios
router.get('/', protect, userController.getAllUsers)
// router.get('/', jwtMW.protect, userController.getAllUsers)

//Mostrar usuario por id
router.get('/:id', protect, restrictTo('ADMIN'), userController.getUserById) // solo puede ver usuarios de ADMIN

//Crear/Registrar un nuevo usuario
router.post('/', userController.registerUser)

//Login
router.post('/login', userController.loginUser)

//Exportar rutas
module.exports = router
