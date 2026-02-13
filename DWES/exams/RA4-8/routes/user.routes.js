const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMW = require('../middlewares/auth.mw') // Importamos el middleware

// Rutas Públicas
router.get('/register', userController.renderRegistro)
router.post('/register', userController.registrar)
router.get('/login', userController.renderLogin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

// Rutas Privadas (Solo entran si están logueados)
// El listado de usuarios ahora es seguro
router.get('/listado', authMW.protagonista, userController.getUsersJSON)

module.exports = router
