//REQUIRES / IMPORTS
require('dotenv').config() //npm i dotenv
const port = process.env.PORT || process.env.PUERTO
const express = require('express')
const app = express()
const path = require('path') //npm i path
const { v4: uuid } = require('uuid') //npm i uuid
const methodOverride = require('method-override') //npm i method-override
const cors = require('cors') //npm i cors
const commentRoutes = require('./routes/comment.routes')
const tvRoutes = require('./routes/tv.routes')
const baseUrlComentarios = `/api/${process.env.API_VERSION}/comentarios`
const baseUrlTV = `/api/${process.env.API_VERSION}/tv`
const mongodbConfig = require('./utils/mongodb.config')

//SETUP - MIDDLEWARES
app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') //npm i ejs (SSR)
app.use(express.static(path.join(__dirname, 'public')))
//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({ extended: true }))
//Leer datos JSON en request body POST
app.use(express.json())
app.use(methodOverride('_method'))
//MIDDLEWARE para configurar VARIABLES GLOBALES en vistas EJS
app.use((req, res, next) => {
  res.locals.tituloEJS = 'API REST'
  res.locals.baseUrlComentarios = baseUrlComentarios
  res.locals.baseUrlTV = baseUrlTV
  next()
})

//DEFINIR RUTAS
//Raíz
app.get('/', (req, res) => res.redirect(baseUrlComentarios))
//Propias del REST
app.use(baseUrlComentarios, commentRoutes)
app.use(baseUrlTV, tvRoutes)
//Rutas por defecto
app.get(/.*/, (req, res) => res.redirect(baseUrlComentarios))

//LEVANTAR EL SERVER
app.listen(port, async () => {
  console.log(`http://localhost:${port}`)
  try {
    // Una vez levantado el servidor, intentamos conectar con MongoDB
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log('Conectado con MongoDB')
      })
      .catch(err => {
        // Si no se pudo conectar, tumbamos el servidor
        console.log(
          `Error conectando con MongoDB. Descripción de error: ${err}`
        )
        // Tumbar el server
        process.exit(1)
      })
  } catch (error) {
    // Si no se pudo conectar, tumbamos el servidor
    console.log(`Error conectando con MongoDB. Descripción de error: ${error}`)
    // Tumbar el server
    process.exit(1)
  }
})
