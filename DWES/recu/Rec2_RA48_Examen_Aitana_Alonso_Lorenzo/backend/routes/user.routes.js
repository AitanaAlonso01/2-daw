const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()
//TO DO - 3 Protección de rutas JWT y/o filtrar por perfil
const { protect } = require('../middlewares/jwt.mw') //Sólo necesita estar logueado
const { restrictTo } = require('../middlewares/profile.mw') //Debes estar logueado y tener cierto PROFILE

router.get('/', protect, restrictTo('ADMIN'), userController.getAllUsers)

router.get('/me', userController.getLoguedUser)

//TO DO 1 Register
//GET Show EJS
router.get('/register', userController.showRegister)
//POST user
router.post('/register', userController.registerUser)

//TO DO 2 Login
//GET Show EJS
router.get('/login', userController.showLogin)
//POST login user
router.post('/login', userController.loginUser)

router.post('/logout', userController.logoutUser)

// Rutas dinámicas
router.get('/:id', protect, restrictTo('ADMIN'), userController.getUserById)

//Exportar rutas
module.exports = router
