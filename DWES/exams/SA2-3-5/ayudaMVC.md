# Ayuda para MVC

## ¿Qué es MVC?

MVC es un patrón de diseño de software que se utiliza para organizar el código de una aplicación. MVC se compone de tres componentes principales: Modelo (o Entidad), Vista (o View) y Controlador (o Control).

El modelo es el conjunto de datos que se utiliza para almacenar y gestionar la información de la aplicación. En el caso de MVC, el modelo se encarga de manejar los datos de la aplicación y proporcionar una interfaz para interactuar con ellos.

La vista es el componente que se encarga de mostrar la información a los usuarios. En el caso de MVC, la vista se encarga de renderizar la información del modelo en una forma visualmente atractiva para los usuarios.

El controlador es el componente que se encarga de manejar las interacciones del usuario con la aplicación. En el caso de MVC, el controlador se encarga de recibir las solicitudes de entrada del usuario y de procesarlas para actualizar el modelo y mostrar la información en la vista.

## Estructura BASICA de carpetas de una aplicación MVC

```bash
app/
│
├── index.js
├── routes/
│   └── app.routes.js
├── controllers/
│   └── app.controller.js
├── services/
│   └── app.service.js
├── models/
│   └── app.model.json
└── views/
    ├── listar.ejs
    ├── mostrar.ejs
    └── edit.ejs
```

### Servidor (index.js)

```javascript
require('dotenv').config()
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
const appRoutes = require('./routes/app.routes')

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// Rutas base de la aplicación
app.use('/app', appRoutes)

// Levantar Servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`)
})
```

### Rutas (routes/app.routes.js)

```javascript
const express = require('express')
const router = express.Router()
const controller = require('../controllers/app.controller')

// Listado
router.get('/', controller.list)

// Ficha
router.get('/:nombre', controller.show)

// Editar
router.get('/:nombre/edit', controller.edit)
router.put('/:nombre', controller.update)

// Eliminar
router.delete('/:nombre', controller.remove)

module.exports = router
```

### Controlador (controllers/app.controller.js)

```javascript
const service = require('../services/app.service')

exports.list = (req, res) => {
  const items = service.findAll()
  res.render('listar', { items })
}

exports.show = (req, res) => {
  const item = service.findByName(decodeURIComponent(req.params.nombre))
  res.render('mostrar', { item })
}

exports.edit = (req, res) => {
  const item = service.findByName(decodeURIComponent(req.params.nombre))
  res.render('edit', { item })
}

exports.update = (req, res) => {
  service.update(decodeURIComponent(req.params.nombre), req.body)
  res.redirect(`/app/${encodeURIComponent(req.params.nombre)}`)
}

exports.remove = (req, res) => {
  service.remove(decodeURIComponent(req.params.nombre))
  res.redirect('/app')
}
```

### Servicio (services/app.service.js)

```javascript
let items = require('../models/app.model.json')

function findAll() {
  return items
}

function findByName(name) {
  return items.find(i => i.name === name)
}

function update(name, data) {
  const item = findByName(name)
  if (item) {
    if (data.height) item.height = data.height
    if (data.mass) item.mass = data.mass
  }
  return item
}

function remove(name) {
  items = items.filter(i => i.name !== name)
}

module.exports = { findAll, findByName, update, remove }
```

### Modelos (models/app.model.json)

```json
[
  { "name": "Item 1", "height": "100", "mass": "50" },
  { "name": "Item 2", "height": "120", "mass": "60" }
]
```

### Vistas

#### (views/listar.ejs)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Listar</title>
    <link rel="stylesheet" href="/styles.css" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <h1>Galería</h1>
    <ul>
      <% items.forEach(i => { %>
      <li>
        <a href="/app/<%= encodeURIComponent(i.name) %>"><%= i.name %></a>
      </li>
      <% }) %>
    </ul>

    <script src="/app.js"></script>
  </body>
</html>
```

#### (views/mostrar.ejs)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mostrar</title>
    <link rel="stylesheet" href="/styles.css" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <h1><%= item.name %></h1>
    <p>Altura: <%= item.height %> cm</p>
    <p>Peso: <%= item.mass %> kg</p>

    <a href="/app/<%= encodeURIComponent(item.name) %>/edit">Editar</a>

    <form
      action="/app/<%= encodeURIComponent(item.name) %>?_method=DELETE"
      method="post"
    >
      <button>Eliminar</button>
    </form>

    <script src="/app.js"></script>
  </body>
</html>
```

#### (views/edit.ejs)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Editar</title>
    <link rel="stylesheet" href="/styles.css" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <h1>Editar <%= item.name %></h1>
    <form
      action="/app/<%= encodeURIComponent(item.name) %>?_method=PUT"
      method="post"
    >
      <label>Altura:</label>
      <input type="text" name="height" value="<%= item.height %>" />
      <label>Peso:</label>
      <input type="text" name="mass" value="<%= item.mass %>" />
      <button type="submit">Guardar</button>
    </form>

    <a href="/app/<%= encodeURIComponent(item.name) %>">Cancelar</a>
  </body>
</html>
```

---

### Ejecución

```bash
npm install
nodemon
```
