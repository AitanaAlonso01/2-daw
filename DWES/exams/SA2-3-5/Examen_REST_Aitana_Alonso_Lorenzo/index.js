// Require o Imports
require('dotenv').config() // npm i dotenv
const port = process.env.PORT || process.env.PUERTO // usa el puerto del servidor, sino usa el de .env
const express = require('express') // npm i express
const app = express()
const path = require('path') //npm i path
const { v4: uuid } = require('uuid') //npm i uuid
const methodOverride = require('method-override') //npm i method-override
const cors = require('cors') //npm i cors
const axios = require('axios') //npm i axios
const pedidosRoutes = require('./routes/pedidos.routes') // cargamos el archivo de rutas

// SETUP - MIDDLEWARES
app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') //npm i ejs (SSR)
app.use(express.static(path.join(__dirname, 'public')))

//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({ extended: true }))
//Leer datos JSON en request body POST
app.use(express.json())
app.use(methodOverride('_method'))

// DEFINIR RUTAS EN SERVER
app.get('/', (req, res) => res.redirect('/pedidos')) // redireccionamos a la ruta /pedidos
app.use('/pedidos', pedidosRoutes)

// Levantar el servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
