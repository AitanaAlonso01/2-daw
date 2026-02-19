//REQUIRES / IMPORTS
require('dotenv').config() //npm i dotenv
//HTTPS
const https = require('https') //npm i https
const fs = require('fs')
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger')
const port = process.env.PORT || process.env.PUERTO
const express = require('express')
const app = express()
const path = require('path') //npm i path
const methodOverride = require('method-override') //npm i method-override
const cookieParser = require('cookie-parser') //npm i cookie-parser
const cors = require('cors') //npm i cors
const morgan = require('morgan') //npm i morgan

const commentRoutes = require('./routes/comment.routes')
const userRoutes = require('./routes/user.routes')
const commentRoutesCSR = require('./routes/comment.csr.routes')
const tvRoutes = require('./routes/tv.routes')
const catRoutes = require('./routes/categoria.routes')
const filesRoutes = require('./routes/files.routes')
const baseUrlComentarios = `/api/${process.env.API_VERSION}/comentarios`
const baseUrlComentariosCSR = `/api/${process.env.API_VERSION}/comments`
const baseUrlUsers = `/api/${process.env.API_VERSION}/users`
const baseUrlTV = `/api/${process.env.API_VERSION}/tv`
const baseUrlCategorias = `/api/${process.env.API_VERSION}/categorias`
const baseUrlFiles = `/api/${process.env.API_VERSION}/files`
const mongodbConfig = require('./utils/mongodb.config')
const morganMW = require('./middlewares/morgan.mw')
const errorHandlerMW = require('./middlewares/errorHandler.mw')
const AppError = require('./utils/AppError')

//TO DO - 2 y 3 cookies / session

app.use(cookieParser())

//TO DO - 6 cors
app.use(
  cors({
    origin: 'http://localhost:3010', // La URL exacta de tu Vite/React
    credentials: true, // Vital para que viajen las cookies/tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)

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

//HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs/localhost-2daw-2526.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/localhost-2daw-2526.crt')),
}

//TO DO 4 Morgan MW
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

//DEFINIR RUTAS
app.use(process.env.SWAGGER_DOCS, swaggerUI.serve, swaggerUI.setup(specs))
//Raíz
app.get('/', (req, res) => res.redirect(baseUrlComentarios))
//Propias del REST
app.use(baseUrlComentarios, commentRoutes)
app.use(baseUrlComentariosCSR, commentRoutesCSR)
app.use(baseUrlTV, tvRoutes)
app.use(baseUrlCategorias, catRoutes)
app.use(baseUrlUsers, userRoutes)
app.use(baseUrlFiles, filesRoutes)

//Rutas por defecto
app.get(/.*/, (req, res) => {
  throw new AppError('Ruta no existente: ' + req.originalUrl, 404) //NOT FOUND
})

//TO DO - 5 Gestión de todos los errores (Síncrono y Asíncrono)
app.use((err, req, res, next) => {
  console.error('ERROR EN EL SERVIDOR:', err.stack)
  res.status(500).json({
    mensaje: 'Ha ocurrido un error interno en el servidor',
    error: err.message,
  })
})

//LEVANTAR EL SERVER
//HTTPS
//app.listen(port,async()=>{
https.createServer(httpsOptions, app).listen(port, async () => {
  console.log(`https://localhost:${port}/api/v1/comments`)
  console.log(`Swagger en https://localhost:${port}${process.env.SWAGGER_DOCS}`)

  try {
    //Una vez levantado el servidor, intentamos conectar con MongoDB
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log('Conectado con MongoDB!!!')
      })
      .catch(err => {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar con MongoDB. Desc: ${err}`)
        //Tumbar el server
        process.exit(0)
      })
  } catch (error) {
    //Si no conectamos con MongoDB, debemos tumbar el server
    console.log(`Error al conectar con MongoDB. Desc: ${error}`)
    //Tumbar el server
    process.exit(0)
  }
})
