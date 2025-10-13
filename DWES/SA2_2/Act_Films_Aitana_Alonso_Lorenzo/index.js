const fs = require('fs').promises
const express = require('express') //npm i express
const app = express()
const port = 3000
const path = require('path') //npm i path
app.set('view engine', 'ejs') //npm i ejs
app.set('views', path.join(__dirname, 'views')) //donde irá a buscar las vistas
app.use(express.static(path.join(__dirname, 'public'))) //donde irá a buscar los recursos estáticos

/*
ruta de llamada
app.get('/', (req, res) => {})
*/

//Ruta / -> googlemovies.ejs
app.get('/', (req, res) => {
  res.render('googlemovies.ejs')
})

app.get('/search', (req, res) => {
  const query = req.query.query?.toLowerCase()

  fs.readFile('./films.json', 'utf-8')
    .then(raw => {
      const data = JSON.parse(raw)

      // Convertimos las claves a minúsculas para comparar
      const claves = Object.keys(data)
      const claveCoincidente = claves.find(k => k.toLowerCase() === query)

      if (claveCoincidente) {
        const peli = data[claveCoincidente]
        res.render('search.ejs', { peli, query })
      } else {
        res.send(`<h1>No se encontró ninguna película para "${query}"</h1>`)
      }
    })
    .catch(error => {
      res.send(`<h1>Error al leer films.json: ${error}</h1>`)
    })
})

app.listen(3000, () => {
  console.log('Servidor activo en http://localhost:3000')
})

//Ruta por defecto (*)
app.get(/.*/, (req, res) => {
  res.send('<h1>ERROR 404! PAGE NOT FOUND</h1>')
})

//Levantar el servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
