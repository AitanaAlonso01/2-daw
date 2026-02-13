//IMPORTS/REQUIRE
//PROCESS.ENV (npm i dotenv)
require('dotenv').config()

const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger')

const methodOverride = require('method-override') //npm i method-override
const express = require('express') //npm i express
const app = express()
const path = require('path') //npm i path
const port = process.env.PORT || process.env.PUERTO
const commentRoutes = require('./routes/comment.routes')
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const orderRoutes = require('./routes/order.routes')
const mongodbConfig = require('./utils/mongodb.config')
const tvRoutes = require('./routes/tv.routes')

//CONFIGURACIONES
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') //npm i ejs
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true })) //Para poder leer datos (request body) en métodos POST
app.use(express.json()) //Leer datos JSON en request body POST

app.use(
  cors({
    origin: 'http://localhost:4000', // Pon la URL directa, es más seguro para el examen
    credentials: true,
  })
)

app.use(cookieParser())

app.use((req, res, next) => {
  //Variables GLOBALES para vistas EJS
  res.locals.Pepito = 'Pruebas'
  res.locals.tituloEJS = 'API REST'
  res.locals.BaseURLComments = `/api/${process.env.API_VERSION}/comments`
  next()
})

//RUTAS
// Login, Registro y Listado JSON
app.use(`/api/${process.env.API_VERSION}/`, userRoutes)
app.use(`/api/${process.env.API_VERSION}/login`, userRoutes)

app.use(process.env.SWAGGER_DOCS, swaggerUI.serve, swaggerUI.setup(specs))
app.use(`/api/${process.env.API_VERSION}/comments`, commentRoutes)
app.use(`/api/${process.env.API_VERSION}/shows`, tvRoutes)
app.use(`/api/${process.env.API_VERSION}/products`, productRoutes)
app.use(`/api/${process.env.API_VERSION}/users`, userRoutes)
app.use(`/api/${process.env.API_VERSION}/orders`, orderRoutes)

//Resto de rutas (único app.get de todo el API REST)
app.get(/.*/, (req, res) => {
  res.status(500).json({ err: 'No existe la ruta' })
})

/* LEVANTAR SERVER */
app.listen(port, async () => {
  console.log(
    `${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API_VERSION}/`
  )
  console.log(
    `Documentación creada con Swagger en http://localhost:${port}${process.env.SWAGGER_DOCS}`
  )
  try {
    //Una vez levantado el servidor, intentamos conectar con MongoDB
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log('Conectado con MongoDB!!!')
      })
      .catch(err => {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar. Desc: ${err}`)
        process.exit(0)
      })
  } catch (error) {
    //Si no conectamos con MongoDB, debemos tumbar el server
    console.log(`Error en el server. Desc: ${error}`)
    process.exit(0)
  }
})
