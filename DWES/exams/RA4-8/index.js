// 1. REQUIRES / IMPORTS (Siempre al principio)
require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

// Importaciones de archivos propios (Asegúrate de que existan)
const mongodbConfig = require('./utils/mongodb.config')
const AppError = require('./utils/AppError')
const errorHandlerMW = require('./middlewares/errorHandler.mw')

// Importación de Rutas
const userRoutes = require('./routes/user.routes')
const commentRoutes = require('./routes/comment.routes')

const app = express()
const port = process.env.PUERTO || 3010

// 2. CONFIGURACIÓN DE CORS (Para el RA8 - React)
const whiteList = ['http://localhost:5173'] // El puerto de tu React

const corsOptions = {
  origin: (origin, callback) => {
    // origin es la clave: permite peticiones desde el mismo navegador o Postman
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No pasarás por CORS!'))
    }
  },
  credentials: true, // Obligatorio para que las cookies funcionen
}

// 3. MIDDLEWARES BASE
app.use(
  cors({
    origin: 'http://localhost:5173', // Pon la URL directa, es más seguro para el examen
    credentials: true,
  })
)

app.use(cookieParser()) // IMPORTANTE: que vaya justo después de CORS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Configuración de Vistas (EJS para el RA4)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// 4. DEFINICIÓN DE RUTAS
const apiVersion = `/api/${process.env.API_VERSION || 'v1'}`

// Usamos las rutas importadas
app.use(`${apiVersion}/users`, userRoutes) // Login, Registro y Listado JSON
app.use(`${apiVersion}/comments`, commentRoutes) // Otros datos para React

// Ruta raíz (Home)
app.get('/', (req, res) => {
  res.render('home', { tituloEJS: 'Examen Desarrollo Web 2026' })
})

// 5. GESTIÓN DE ERRORES
// Captura cualquier ruta que no exista
app.all(/.*/, (req, res, next) => {
  next(
    new AppError(
      `No se encuentra la ruta ${req.originalUrl} en este servidor`,
      404
    )
  )
})

// Middleware central de errores (Siempre el último app.use)
app.use(errorHandlerMW.errorHandler)

// 6. LEVANTAR SERVIDOR Y CONECTAR DB
app.listen(port, async () => {
  console.log(`>>> Servidor corriendo en: http://localhost:${port}`)
  await mongodbConfig.conectarMongoDB()
})
