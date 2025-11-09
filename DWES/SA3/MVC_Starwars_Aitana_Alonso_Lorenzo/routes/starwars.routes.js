const express = require('express')
const router = express.Router()
const controller = require('../controllers/starwars.controller')
const path = require('path')

// Vista estática de búsqueda
router.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/search.html'))
})

// para búsqueda desde search.html
router.get('/api/personajes', controller.list)

// Vistas y operaciones sobre personajes
router.get('/starwars', controller.list)
router.get('/personajes/:id', controller.show)
router.get('/personajes/:id/edit', controller.edit)
router.put('/personajes/:id', controller.update)
router.delete('/personajes/:id', controller.remove)
router.get('/starwars/new', controller.new)
router.post('/starwars', controller.create)

module.exports = router
