const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Proteger rutas
router.post('/', userController.registrar)
router.post('/login', userController.login)

router.get('/users', userController.findAllUsers)
router.get('/users/:id', userController.findUserById)
router.put('/users/:id', userController.editUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router
