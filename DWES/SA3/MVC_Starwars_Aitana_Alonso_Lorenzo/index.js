// Require o Imports
require('dotenv').config() // npm install dotenv
const express = require('express') // npm install express
const path = require('path') // npm install path
const methodOverride = require('method-override') // npm install method-override
const cors = require('cors') // npm install cors

const app = express()
const port = process.env.PORT || process.env.PUERTO || 3000 // puerto recogido de la variable de entorno del .env

// RUTAS
const starwarsRoutes = require('./routes/starwars.routes') // donde se definen las rutas

// MIDDLEWARES
app.use(cors())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // necesario para recibir JSON en API REST
app.use(express.static(path.join(__dirname, 'public'))) // archivos estáticos como CSS, JS, HTML, etc.

app.set('views', path.join(__dirname, 'views')) // views se encuentran en la carpeta views
app.set('view engine', 'ejs')

// REDIRECCIONES
app.get('/', (req, res) => res.redirect('/search'))

// RUTAS (starwars.routes.js)
app.use('/', starwarsRoutes)

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
