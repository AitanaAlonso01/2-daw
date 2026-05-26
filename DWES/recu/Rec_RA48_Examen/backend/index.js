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
const session = require('express-session') //npm i express-session (para poder guardar el token en el objeto sesión)
const cookieParser = require('cookie-parser') //npm i cookie-parser (para poder guardar el token en cookies)
//TO DO - 6 cors
const cors = require('cors') //npm i cors (para poder usar el CORS y atacarlo desde el FrontEnd, protegiéndolo)

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

//TO DO - 2 y 3 cookies / session
//Usamos tanto el cookieParser y la Sesión (debemos hacerlo para que funcione, si no no irá)
app.use(cookieParser())
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'clave_super_secreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
)

//HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs/localhost-2daw-2526.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/localhost-2daw-2526.crt')),
}

//TO DO - 6 cors
//Usando cors con la WHITE LIST que permite el acceso
const whiteList = [
  'https://localhost:5500',
  'https://127.0.0.1:5500',
  'https://localhost:3010',
  'https://127.0.0.1:3010',
  'https://localhost:5173',
  'https://127.0.0.1:5173',
]
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new AppError('No pasarás!', 403))
    }
  },
  credentials: true, //Envio cookies del BackEnd al FrontEnd
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ¡Asegúrate de incluir OPTIONS!
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
}
app.use(cors(corsOptions))

//TO DO 4 Morgan MW
app.use(morganMW.usingMorgan())

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
app.use(errorHandlerMW.errorHandler)

//LEVANTAR EL SERVER
//HTTPS
//app.listen(port,async()=>{
https.createServer(httpsOptions, app).listen(port, async () => {
  console.log(`https://localhost:${port}/api/v1/users/register`)
  console.log(`https://localhost:${port}/api/v1/users/login`)
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
