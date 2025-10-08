const express = require('express') //npm i express
const app = express()
const port = 3000
const path = require('path') //npm i path
app.set('view_engine', 'ejs') //npm i ejs
app.set('views', path.join(__dirname, 'views')) //ruta de donde colocar las vistas
let contactos = ['Manolo', 'María', 'Paco', 'Yolanda']
//--------------------------------------
//app.get('/', (req, res) => {}) //ruta de get/llamada
app.get('/', (req, res) => {
  const titulo = req.query.nombre
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
// app.get('/:notFound(*)', (req, res) => {
//   res.send('<h1>ERROR 404 PAGE NOT FOUND</h1>')
// })

//Levantar el servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
