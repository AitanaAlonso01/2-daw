//npm init (para crear un package.json CON un cuestionario)
//npm init -y (para crear un package.json CON un cuestionario)
//npm i -g nodemon (para instalar nodemon)
const express = require('express') //npm i express
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>INDEX</h1>')
})

app.get('/contactos', (req, res) => {
  //lista de contactos (Pepe, Maria, Juan, Sara)
  res.send(
    `<h1>LISTA DE CONTACTOS</h1>
    <ul>
      <li>Pepe</li>
      <li>Maria</li>
      <li>Juan</li>
      <li>Sara</li>
    </ul>
    `
  )
})

//Parámetros en la RUTA (req.params) --> :param
app.get('/contactos/:nombre/:apellido', (req, res) => {
  console.log(req.params)
  const { nombre, apellido } = req.params
  // const pepito = req.params.nombre
  res.send(`<h1>Hola! ${nombre} ${apellido}</h1>`)
})

//Recoger QUERY STRING (req.query) --> ?param=valor
app.get('/search', (req, res) => {
  //http://localhost:3000/search?q=algo que buscar
  // const q = req.query.q
  const { q } = req.query
  if (q) {
    res.send(`<h1>Buscando resultados que contengan la palabra "${q}"</h1>`)
  } else {
    res.send(`<h1>Debe introducir un parámetro de búsqueda</h1>`)
  }
})

//Levantar el servidor
app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`)
})
