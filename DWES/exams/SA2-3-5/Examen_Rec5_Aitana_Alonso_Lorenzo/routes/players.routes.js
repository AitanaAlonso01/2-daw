const playersController = require('../controllers/players.controller')
const express = require('express')
const router = express.Router()

// Mostrar VISTA EJS index.ejs con listado de players
router.get('/', playersController.findAllPlayers)

//Mostrar VISTA EJS new.ejs para crear un nuevo player
router.get('/new', playersController.showNewPlayer)
router.post('/', playersController.createPlayer) // POST - Crear un nuevo player

// DELETE - Eliminar un player
router.delete('/:id', playersController.deletePlayer)

//Exportar rutas para poder usar en el servidor - Siempre debe exportar las rutas (mejor al final del archivo)
module.exports = router
