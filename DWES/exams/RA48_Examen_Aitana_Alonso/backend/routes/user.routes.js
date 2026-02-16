const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/auth.mw.js')

// 1. RUTAS ABIERTAS (SIEMPRE PRIMERO)
// Al estar arriba, Express las encontrará antes de confundirlas con un ":id"
router.get('/login', userController.renderLogin)
router.post('/login', userController.login)
router.get('/register', userController.renderRegister)
router.post('/register', userController.register)

// 2. RUTAS PROTEGIDAS (CON PARÁMETROS AL FINAL)
router.get('/', auth.validarJWT, auth.esAdmin, userController.findAllUsers)
// El login ya no se confundirá con este :id porque ya se habrá encontrado antes
router.get('/:id', auth.validarJWT, auth.esAdmin, userController.findUserById)
router.put('/:id', auth.validarJWT, auth.esAdmin, userController.editUser)
router.delete('/:id', auth.validarJWT, auth.esAdmin, userController.deleteUser)

module.exports = router
