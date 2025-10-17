// npm init -y
// crear el index.js
const express = require('express') // npm install express
const app = express()
const port = 3010
const path = require('path') // npm i path

app.set('views', path.join(__dirname, 'views')) // directorio que contine las vistas
app.set('view engine', 'ejs') // npm i ejs (SSR)
app.use(express.static(path.join(__dirname, 'public'))) // directorio que contiene los assets
// Poder leer datos (req body) en metodos POST
app.use(express.urlencoded({ extended: true }))
// Leer datos JSON en request body POST
app.use(express.json())

let comentarios = [
  {
    id: 1,
    usuario: 'mike',
    comentario: 'me gusta mucho DWES, es mi modulo preferido',
  },
  {
    id: 2,
    usuario: 'mario',
    comentario: 'yo soy más de despliegue',
  },
  {
    id: 3,
    usuario: 'aitana',
    comentario: 'me gusta más el cuerto de hora del patio',
  },
]

// Rutas
// app.get('/comentarios', (req, res) => {})
//GETS
app.get('/', (req, res) => {
  res.render('index.ejs', { comentarios })
})

app.get('/comentarios', (req, res) => {
  // display all comments
  res.redirect('/') // redireccionar a la ruta principal
})

app.get('/comentarios/new', (req, res) => {
  // form to create new comment
  res.render('new.ejs')
})

app.get('/comentarios/:id', (req, res) => {
  // details for one specific comment
  // 1 - Obtener el id a partir del req.params
  const { id } = req.params
  // 2- Buscar, dentro del array, el objeto que tenga ese id
  const comentario = comentarios.find(c => c.id == id)
  // 3 - Renderizar (y hacer) la vista show.ejs con ese comentario
  res.render('show.ejs', { comentario })
})

app.get('/comentarios/:id/edit', (req, res) => {
  // form to edit one specific comment
  // 1 - Obtener el id a partir del req.params
  const { id } = req.params
  // 2- Buscar, dentro del array, el objeto que tenga ese id
  const comentario = comentarios.find(c => c.id == id)
  // 3 - Renderizar (y hacer) la vista edit.ejs con ese comentario
  res.render('edit.ejs', { comentario })
})

// app.post('/comentarios', (req, res) => {})
//POSTS
app.post('/comentarios', (req, res) => {
  // creates new comment on server
  // body que viene de la ruta POST
  const { usuario, comentario } = req.body
  /* Equivale a:
  const usuario = req.body.usuario
  const comentario = req.body.comentario
  */
  // crear un nuevo comentario
  const nuevoComentario = {
    id: comentarios.length + 1,
    usuario: usuario,
    comentario: comentario,
  }
  comentarios.push(nuevoComentario) // agregar comentario a la lista
  res.redirect('/') // redireccionar a la ruta principal
})

// app.put('/comentarios/:id', (req, res) => {})
//PUTS - PATCH

// Ruta por defecto (*)
app.get(/.*/, (req, res) => {
  res.redirect('/') // redireccionar a la ruta principal
})

// Levantar el server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
