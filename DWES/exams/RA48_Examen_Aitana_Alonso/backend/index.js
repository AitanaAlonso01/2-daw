// 1. IMPORTS
require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger')

const mongodbConfig = require('./utils/mongodb.config')
const commentRoutes = require('./routes/comment.routes')
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const orderRoutes = require('./routes/order.routes')
const tvRoutes = require('./routes/tv.routes')

const app = express()
const port = process.env.PORT || 3015

// 2. MIDDLEWARES DE CONFIGURACIÓN
// Auditoría con Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

// 1. Definimos los sitios permitidos
const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173']

// 2. Configuramos el CORS con una función de chequeo
app.use(
  cors({
    origin: 'http://localhost:5173', // La URL exacta de tu Vite/React
    credentials: true, // Vital para que viajen las cookies/tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)

app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configuración de Vistas (EJS)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Variables GLOBALES para vistas EJS
app.use((req, res, next) => {
  res.locals.Pepito = 'Pruebas'
  res.locals.tituloEJS = 'API REST'
  res.locals.BaseURLComments = `/api/${process.env.API_VERSION}/comments`

  // NUEVO: Extraer usuario del token para EJS
  const token = req.cookies.token
  if (token) {
    try {
      const jwt = require('jsonwebtoken') // Asegúrate de tenerlo disponible
      const decoded = jwt.verify(token, 'SECRETO_DEL_EXAMEN')
      res.locals.user = decoded // Ahora puedes usar <%= user.username %> en EJS
    } catch (e) {
      res.locals.user = null
    }
  } else {
    res.locals.user = null
  }
  next()
})

// 3. RUTAS

// Swagger
app.use(
  process.env.SWAGGER_DOCS || '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs)
)

// --- REDIRECCIÓN INICIAL ---
app.get('/', (req, res) => {
  res.redirect('/api/v2/users/login')
})

// Rutas de la API / Vistas
app.use('/api/v2/users', userRoutes)
app.use('/api/v2/orders', orderRoutes)
app.use(`/api/${process.env.API_VERSION}/comments`, commentRoutes)
app.use(`/api/${process.env.API_VERSION}/shows`, tvRoutes)
app.use(`/api/${process.env.API_VERSION}/products`, productRoutes)

// 4. MANEJO DE RUTAS NO ENCONTRADAS (404)
// Usamos un middleware normal en lugar de un app.get con regex para evitar conflictos
app.use((req, res) => {
  res.status(404).json({ err: 'La ruta solicitada no existe' })
})

// 5. MIDDLEWARE DE MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
  console.error('ERROR EN EL SERVIDOR:', err.stack)
  res.status(500).json({
    mensaje: 'Ha ocurrido un error interno en el servidor',
    error: err.message,
  })
})

// 6. LEVANTAR SERVER Y CONECTAR DB
app.listen(port, async () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`)
  console.log(
    `📄 Documentación: http://localhost:${port}${process.env.SWAGGER_DOCS || '/api-docs'}`
  )

  try {
    await mongodbConfig.conectarMongoDB()
    console.log('✅ Conectado con MongoDB Atlas correctamente')
  } catch (error) {
    console.error('❌ Error fatal al conectar con MongoDB:', error)
    process.exit(1)
  }
})
