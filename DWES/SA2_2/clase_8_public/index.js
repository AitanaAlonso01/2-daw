const datos = require('./data.json')
const fs = require('fs').promises //no npm i fs (no es necesario, viene de fabrica con NODE) //habilitamos las promesas, sino no va a funcionar
const express = require('express') //npm i express
const app = express()
const port = 3000
const path = require('path') //npm i path
const { error } = require('console')
app.set('view_engine', 'ejs') //npm i ejs
app.set('views', path.join(__dirname, 'views')) //ruta de donde colocar las vistas
app.use(express.static(path.join(__dirname, 'public'))) //ruta de donde colocar los archivos estáticos --> obtiene el contenido estático
let contactos = ['Manolo', 'María', 'Paco', 'Yolanda']
//--------------------------------------
//app.get('/', (req, res) => {}) //ruta de get/llamada
app.get('/', (req, res) => {
  const nombre = req.query.nombre
  res.render('home.ejs', { titulo: nombre })
})

app.get('/contactos', (req, res) => {
  //devuelve la lista de contactos en la vista contact.ejs
  res.render('contact.ejs', { contactos })
})

app.get('/random', (req, res) => {
  //genera un numero entero aleatorio entre 1 y 100 en la vista random.ejs
  const numeroAleatorio = Math.floor(Math.random() * 100) + 1
  res.render('random.ejs', { numeroAleatorio })
})

app.get('/blog/:nombre', (req, res) => {
  const { nombre } = req.params // nombre es un parametro de la ruta
  const blog = datos[nombre] // extraigo el objeto con el nombre que se le pasa por parametro
  if (blog) {
    res.render('blog.ejs', { blog }) // si existe, lo renderizo
  } else {
    res.send('<h1>ERROR 404 PAGE NOT FOUND</h1>') // si no existe, lo mandamos como texto
  }
})

app.get('/about', (req, res) => {
  fs.readFile('./public/about.html')
    .then(data => {
      res.setHeader('Content-Type', 'text/html')
      res.writeHead(200) //200 = OK - SUCCESS //es opcional
      res.end(data)
    })
    .catch(error => {
      res.send(`<h1>Error. Desc ${{ error }}</h1>`)
    })
})

app.post('/contactos', (req, res) => {
  const { c, borrar } = req.query
  if (borrar == 1) {
    contactos.pop()
    res.send('<h1>Ultimo contacto eliminado</h1>')
  } else {
    contactos.push(c)
    res.send(`Contacto ${c} agregado`)
  }
})

//Ruta por defecto (*)
app.get(/.*/, (req, res) => {
  res.send('<h1>ERROR 404! PAGE NOT FOUND</h1>')
})

//Levantar el servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
