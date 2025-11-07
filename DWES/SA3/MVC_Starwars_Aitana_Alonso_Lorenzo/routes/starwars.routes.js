const express = require('express')
const router = express.Router()
const controller = require('../controllers/starwars.controller')

router.get('/', (req, res) => res.render('search.ejs')) // ruta raiz o vista de búsqueda
router.get('/starwars', controller.list) // muestra la galeria de personajes
router.get('/starwars/:nombre', controller.show) // muestra la vista que contiene la información del personaje
router.get('/starwars/:nombre/edit', controller.edit) // muestra la vista que contiene el formulario para editar el personaje
router.put('/starwars/:nombre', controller.update) // actualiza el personaje
router.delete('/starwars/:nombre', controller.remove) // elimina el personaje

module.exports = router
