const express = require('express')
const router = express.Router()
const controller = require('../controllers/starwars.controller')

router.get('/', (req, res) => res.render('search.ejs'))
router.get('/starwars', controller.list)
router.get('/starwars/:nombre', controller.show)
router.get('/starwars/:nombre/edit', controller.edit)
router.put('/starwars/:nombre', controller.update)
router.delete('/starwars/:nombre', controller.remove)

module.exports = router
