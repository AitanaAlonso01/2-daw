const express = require('express') //npm i express
const fs = require('fs').promises
const app = express()
const port = 3000
const path = require('path') //npm i path
const { error } = require('console')
const axios = require('axios') // npm i axios
const methodOverride = require('method-override') // npm i method-override
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })) // para leer datos del formulario
app.set('view engine', 'ejs') //npm i ejs
app.set('views', path.join(__dirname, 'views')) //ruta de donde colocar las vistas
app.use(express.static(path.join(__dirname, 'public'))) //ruta de donde colocar los archivos estáticos --> obtiene el contenido estático

// Cargar datos del JSON
const datosRaw = require('./starwars.json')

// Función para cargar las fotos de los personajes en el JSON
/* ------------------------------------------------------------------------------------- */

// Variable global para almacenar el vector modificado
global.personajes = []

// Función para añadir el campo "photo" al JSON
function añadirCampoFoto(datos) {
  return datos.map(personaje => {
    // Extrae el primer nombre para construir el nombre del archivo
    const nombreBase = personaje.name.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')
    return {
      ...personaje,
      photo: `../imgs/${nombreBase}.jpg`, // Ruta relativa a la carpeta /public/imgs
    }
  })
}

// Modificar el JSON al iniciar el servidor
personajes = añadirCampoFoto(datosRaw)
console.log('Personajes cargados con campo photo:', personajes)
/* ------------------------------------------------------------------------------------- */

// Ruta Raiz (/) - Buscador (página principal)
app.get('/', (req, res) => {
  res.render('search.ejs')
})

// Ruta Listar (/starwars) - Lista de personajes

app.get('/starwars', async (req, res) => {
  const q = req.query.q?.toLowerCase()

  // Si el query es "galeria", mostrar todos en modo galería
  if (q === 'galeria') {
    return res.render('listar.ejs', { personajes })
  }

  const coincidencias = q
    ? personajes.filter(p => p.name.toLowerCase().includes(q))
    : personajes

  if (q && coincidencias.length === 0) {
    // No hay coincidencias → mostrar galería completa
    return res.render('listar.ejs', { personajes })
  }

  if (q && coincidencias.length === 1) {
    // Solo una coincidencia → mostrar ficha completa
    const personaje = coincidencias[0]
    const planeta = await getPlaneta(personaje.homeworld)
    return res.render('mostrar.ejs', { personaje, planeta })
  }

  // Varias coincidencias → mostrar fichas completas
  const personajesConPlaneta = await Promise.all(
    coincidencias.map(async p => {
      const planeta = await getPlaneta(p.homeworld)
      return { personaje: p, planeta }
    })
  )

  res.render('mostrar.ejs', { personajesConPlaneta })
})

// Ruta Mostrar (/starwars/:nombre) - Mostrar detalles de un personaje

async function getPlaneta(url) {
  try {
    // Si hay URL, obtener datos del planeta
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    // Si no hay URL, devolver null
    console.error('Error al obtener planeta:', err.message)
    return null
  }
}

// Ruta Mostrar (/starwars/:nombre) - Mostrar detalles de un personaje
app.get('/starwars/:nombre', async (req, res) => {
  const decodedName = decodeURIComponent(req.params.nombre)
  const personaje = personajes.find(p => p.name === decodedName)
  // Si no se encuentra el personaje, mostrar galería completa
  if (!personaje) return res.render('listar.ejs', { personajes })

  const planeta = await getPlaneta(personaje.homeworld)
  res.render('mostrar', { personaje, planeta })
})

// Ruta Editar (/starwars/:nombre/edit) - Editar detalles de un personaje

app.get('/starwars/:nombre/edit', (req, res) => {
  const decodedName = decodeURIComponent(req.params.nombre)
  const personaje = personajes.find(p => p.name === decodedName)
  if (!personaje) return res.status(404).send('Personaje no encontrado')

  res.render('edit', { personaje })
})

app.put('/starwars/:nombre', (req, res) => {
  const decodedName = decodeURIComponent(req.params.nombre)
  const { height, mass } = req.body

  const personaje = personajes.find(p => p.name === decodedName)
  if (!personaje) return res.status(404).send('Personaje no encontrado')

  // Actualizar datos del personaje
  personaje.height = height
  personaje.mass = mass

  res.redirect(`/starwars/${encodeURIComponent(decodedName)}`)
})

// Ruta Eliminar (/starwars/:nombre/delete) - Eliminar un personaje
app.delete('/starwars/:nombre', (req, res) => {
  const decodedName = decodeURIComponent(req.params.nombre)
  const personaje = personajes.find(p => p.name === decodedName)
  if (!personaje) return res.status(404).send('Personaje no encontrado')

  personajes = personajes.filter(p => p.name !== decodedName)

  res.redirect('/starwars')
})

/* ------------------------------------------------------------------------------------- */
//Ruta por defecto (*)
app.get(/.*/, (req, res) => {
  res.send('<h1>ERROR 404! PAGE NOT FOUND</h1>')
})

//Levantar el servidor
app.listen(port, () => {
  personajes = añadirCampoFoto(datosRaw)
  console.log('Personajes cargados con campo photo:', personajes)
  console.log(`http://localhost:${port}`)
})
