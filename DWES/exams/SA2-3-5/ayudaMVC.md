# Guía MVC en Node.js con Express y EJS

## 📌 ¿Qué es MVC?

El patrón **Modelo-Vista-Controlador (MVC)** organiza una aplicación en tres capas:

- **Modelo**: gestiona los datos y la lógica de negocio.
- **Vista**: muestra la información al usuario (plantillas EJS).
- **Controlador**: recibe las peticiones, usa el modelo y decide qué vista renderizar.

---

## 🗂️ Modelo (Model)

Ejemplo: `models/starwars.model.json` o un servicio que accede a datos.

```js
// services/starwars.service.js
const datosRaw = require('../models/starwars.model.json')

function findAll() {
  return datosRaw
}

function findByName(name) {
  return datosRaw.find(p => p.name === name)
}

module.exports = { findAll, findByName }
```

## 📝 Vista (View)

Ejemplo: `views/starwars.view.ejs` o un servicio que renderiza una plantilla.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Galería Star Wars</title>
  </head>
  <body>
    <h1>Personajes</h1>
    <ul>
      <% personajes.forEach(p => { %>
      <li>
        <a href="/starwars/<%= encodeURIComponent(p.name) %>">
          <%= p.name %>
        </a>
      </li>
      <% }) %>
    </ul>
  </body>
</html>
```

## 📡 Controlador (Controller)

Ejemplo: `controllers/starwars.controller.js` o un servicio que recibe las peticiones.

```js
const service = require('../services/starwars.service')

exports.list = (req, res) => {
  const personajes = service.findAll()
  res.render('listar', { personajes })
}

exports.show = (req, res) => {
  const personaje = service.findByName(decodeURIComponent(req.params.nombre))
  res.render('mostrar', { personaje })
}
```

## 🛣️ Rutas (Routes)

Ejemplo: `routes/starwars.routes.js` o un servicio que mapea las peticiones a los controladores.

```js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/starwars.controller')

// Página de búsqueda
router.get('/', (req, res) => res.render('search'))

// Listado de personajes
router.get('/starwars', controller.list)

// Ficha de personaje
router.get('/starwars/:nombre', controller.show)

module.exports = router
```

## Servidor (Server)

Ejemplo: `index.js` o un servicio que inicia el servidor.

```js
const express = require('express')
const app = express()
const path = require('path')
const starwarsRoutes = require('./routes/starwars.routes')

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middleware para formularios
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/', starwarsRoutes)

// Servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
```
