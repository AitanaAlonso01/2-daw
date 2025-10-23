const fs = require('fs').promises
const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))
console.log('Ruta de estáticos:', path.join(__dirname, 'public'))

// Ruta principal
app.get('/', (req, res) => {
  res.render('googlemovies.ejs')
})

// Ruta de búsqueda
app.get('/search', (req, res) => {
  const query = req.query.query?.toLowerCase()

  fs.readFile('./films.json', 'utf-8')
    .then(raw => {
      const data = JSON.parse(raw)
      const claves = Object.keys(data)

      // Filtrar todas las claves que contengan el query (insensible a mayúsculas)
      const coincidencias = claves.filter(k => k.toLowerCase().includes(query))

      if (coincidencias.length > 0) {
        const resultados = coincidencias.map(k => ({
          titulo: k,
          datos: data[k],
        }))
        res.render('search.ejs', { resultados, query })
      } else {
        res.render('search.ejs', { resultados: [], query })
      }
    })
    .catch(error => {
      res.send(`<h1>Error al leer films.json: ${error}</h1>`)
    })
})

// Ruta 404 (debe ir al final)
app.use((req, res) => {
  res.status(404).send('<h1>ERROR 404 - Página no encontrada</h1>')
})

// Levantar servidor (solo UNA VEZ)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
