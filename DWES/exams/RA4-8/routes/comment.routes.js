const express = require('express')
const router = express.Router()

// Ruta básica para que no pete el index
router.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta de comentarios funcionando' })
})

module.exports = router
