# Ayuda

## Configuración Global (index.js)

los middlewares de sesión, cookies, CORS restrictivo y el motor de rutas

```js
// --- MIDDLEWARE DE CORS (Restringido al puerto de React Vite) ---
// TO DO - 6 cors
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:5173', // Puerto por defecto de Vite [cite: 46]
  credentials: true, // Crucial para permitir el envío de cookies/tokens con Axios
}
app.use(cors(corsOptions))

// --- CONFIGURACIÓN DE COOKIES Y SESIONES ---
// TO DO - 2 y 3 cookies / session
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cookieParser())
app.use(
  session({
    secret: 'mi_clave_secreta_de_sesion', // Puede venir de process.env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // httpOnly para proteger contra XSS
  })
)

// --- INTEGRACIÓN DE MORGAN ---
// TO DO 4 Morgan MW
const morganMW = require('./middlewares/morgan.mw')
app.use(morganMW.usingMorgan())

// --- CONTROLADOR GLOBAL DE ERRORES ---
// (Va SIEMPRE al final de todos los app.use y rutas)
// TO DO - 5 Gestión de todos los errores (Sincrono y Asincrono)
const { errorHandler } = require('./middlewares/errorHandler.mw')
app.use(errorHandler)
```

## Los Guardianes de Seguridad (middlewares/)

### Verificación del Token (jwt.mw.js)

intercepta la petición, extrae el token de la cookie (o cabecera) y valida si el usuario está logueado

```js
// TO DO - 3 JWT Protect
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

exports.protect = (req, res, next) => {
  let token = null

  // 1. Intentar buscar en cabecera Bearer (Postman / API pura)
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  // 2. Intentar buscar en la Cookie (Nuestra App SSR / CSR)
  else if (req.cookies?.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(new AppError('No has iniciado sesión. Acceso denegado.', 401))
  }

  try {
    // Verificar firma con la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Inyectamos el PAYLOAD (id, username, profile) en el objeto request
    req.user = decoded
    next()
  } catch (error) {
    next(new AppError('Token inválido o expirado.', 401))
  }
}
```

### Restricción por Roles (profile.mw.js)

Comprueba si el perfil del usuario inyectado por protect tiene los permisos necesarios.

```js
// TO DO - 3 restrict to profiles
const AppError = require('../utils/AppError')

exports.restrictTo = (...profiles) => {
  return (req, res, next) => {
    const usuario = req.user // Traído desde jwt.mw.js (.protect)

    // Comprobamos si el rol está incluido en los argumentos permitidos
    if (!usuario || !profiles.includes(usuario.profile)) {
      return next(
        new AppError('No tienes permisos para realizar esta acción.', 403)
      ) // 403 Forbidden
    }
    next()
  }
}
```

## Capa de Datos y Criptografía (utils/ & services/)

### Utilidad de Encriptado (utils/bcrypt.js)

Lógica aislada para gestionar el hashing de contraseñas.

```js
// TO DO 1 Encriptación / Desencriptación
const bcrypt = require('bcrypt')

// Hashear al registrar
exports.hashPassword = async passwordTextoPlano => {
  return await bcrypt.hash(passwordTextoPlano, 12) // 12 rondas de salado estándar
}

// Comparar al loguear
exports.compareLogin = async (passTextoPlano, passCodificadaBD) => {
  return await bcrypt.compare(passTextoPlano, passCodificadaBD) // Devuelve true/false
}
```

### Registro y Validación en Base de Datos (services/user.service.js)

reglas de negocio, como los formatos de contraseña por Regex que te pida el enunciado.

```js
// TO DO 1 Register (Validando y encriptando contraseña)
const User = require('../models/user.model')
const bcryptUtils = require('../utils/bcrypt')

exports.register = async (username, password) => {
  // Ejemplo Regex: Mínimo 6 caracteres, 1 mayúscula y 1 minúscula (según el PDF) [cite: 31]
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

  if (!passwordRegex.test(password)) {
    return { err: 'La contraseña no cumple con los requisitos mínimos.' }
  }

  // Encriptamos
  const hashedPassword = await bcryptUtils.hashPassword(password)

  // Creamos con el rol por defecto del enunciado (USER)
  const newUser = new User({
    username,
    password: hashedPassword,
    profile: 'USER',
  })

  return await newUser.save()
}
```

## Controladores y Manejo de Errores (controllers/ & middlewares/)

### Envoltorio Asíncrono (utils/functions.js)

Para no escribir bloques try/catch vacíos en los controladores.

```js
// TO DO - 5 protección asíncrona
exports.wrapAsync = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(e => next(e)) // Captura fallos de BD o código y los manda a next()
  }
}
```

### Aplicación en Controladores CSR (controllers/comment.controller.js)

un controlador síncrono/asíncrono tradicional a la arquitectura protegida con AppError

```js
const { wrapAsync } = require('../utils/functions')
const AppError = require('../utils/AppError')
const CommentService = require('../services/comment.service')

// Envolver TODA la función en wrapAsync y pasarle (req, res, next)
exports.getCommentById = wrapAsync(async (req, res, next) => {
  const { id } = req.params
  const comentario = await CommentService.getById(id)

  if (comentario) {
    res.status(200).json(comentario)
  } else {
    // En vez de res.status(404).json(), disparamos el error hacia el middleware
    return next(new AppError('Comentario no encontrado', 404))
  }
})
```

### El Middleware Global de Errores (middlewares/errorHandler.mw.js)

El embudo final donde mueren todos los fallos. Protegido contra errores imprevistos nativos (que no traen propiedad .status)

```js
// TO DO - 5 protección sincrona y asincrona de errores
const logger = require('../utils/logger')

exports.errorHandler = (err, req, res, next) => {
  // Si es un error nativo (ej: error de sintaxis en JS), no tendrá status. Asignamos 500.
  const status = err.status || 500
  const message = err.message || 'Error interno del servidor inesperado'

  // Escribimos en el archivo físico usando log4js
  logger.error.error(`Status: ${status} - Message: ${message}`)

  // Respondemos al cliente de forma limpia
  res.status(status).json({
    error: message,
  })
}
```

## El Enrutador Seguro (routes/)

combinación final en los archivos de rutas (user.routes.js, comment.csr.routes.js) para blindar los endpoints.

```js
const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

// Importamos los guardianes
const { protect } = require('../middlewares/jwt.mw')
const { restrictTo } = require('../middlewares/profile.mw')

// --- RUTAS PÚBLICAS ---
// El enunciado dice que el GET de comentarios es público para React
router.get('/', commentController.getAllComments)

// --- RUTAS PROTEGIDAS ---
// Para crear, editar o borrar comentarios se requiere estar logueado (USER o ADMIN)
router.post('/', protect, commentController.newComment)
router.patch('/:id', protect, commentController.editCommentById)

// Si una ruta fuese exclusiva de ADMINISTRADORES:
router.delete(
  '/:id',
  protect,
  restrictTo('ADMIN'),
  commentController.deleteCommentById
)

module.exports = router
```

## El controlador de Login y Registro para Vistas (SSR)

Cuando el usuario rellena el formulario en login.ejs y sale bien, hay que guardarlo todo y redirigir a la página de comentarios. Si sale mal, se manda al gestor de errores.

```js
// TO DO 2 - Login (Formato SSR para el Examen)
exports.login = wrapAsync(async (req, res, next) => {
  const { username, password } = req.body
  const user = await userService.login(username, password)

  // Si las credenciales fallan, disparamos el error hacia tu errorHandler.mw.js
  if (!user) {
    return next(new AppError('Usuario o contraseña incorrectos', 401))
  }

  // 1. Crear Token JWT
  const token = jwt.sign(
    { id: user._id, username: user.username, profile: user.profile },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  // 2. Guardar en COOKIE y en SESIÓN (Doble seguridad que pide el PDF)
  res.cookie('token', token, { httpOnly: true, secure: false })
  req.session.user = {
    id: user._id,
    username: user.username,
    profile: user.profile,
  }

  // 3. ¡CLAVE SSR!: En vez de .json(), redirigimos a la vista principal
  res.redirect('/comentarios')
})
```

## Mostrar las pantallas de Login y Registro (GET)

Para que cuando escribas /login en el navegador se abra el archivo login.ejs, necesitas estas dos funciones sencillas en tu controlador que simplemente pintan la plantilla:

```js
// Funciones para cargar los formularios en el navegador
exports.showLogin = (req, res) => {
  res.render('login.ejs')
}

exports.showRegister = (req, res) => {
  res.render('register.ejs')
}
```

Andando a las rutas (user.routes.js), se enlazan de forma pública para que cualquiera pueda entrar a loguearse:

```js
router.get('/login', userController.showLogin)
router.get('/register', userController.showRegister)
```

## El truco del botón Eliminar en las Vistas (method-override)

Como has visto en tu index.ejs, el botón de borrar comentarios usa un formulario que envía un POST con un truco al final: ?\_method=DELETE.

Para que tu servidor Node entienda que ese POST es en realidad un DELETE, te van a pedir configurar una línea en el index.js.

```js
// TO DO - Soporte para métodos PUT y DELETE en formularios HTML
const methodOverride = require('method-override')
app.use(methodOverride('_method')) // Busca el "?_method=" en las URLs de los formularios
```
