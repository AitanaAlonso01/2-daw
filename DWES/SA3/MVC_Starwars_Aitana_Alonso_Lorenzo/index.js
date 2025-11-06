// Require o Imports
require('dotenv').config()
const port = process.env.PORT || process.env.PUERTO
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const cors = require('cors')

// Importar rutas
const starwarsRoutes = require('./routes/starwars.routes')

// SETUP - MIDDLEWARES
app.use(cors())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// DEFINIR RUTAS EN SERVER
app.get('/', (req, res) => res.redirect('/search'))
app.use('/search', starwarsRoutes)

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
