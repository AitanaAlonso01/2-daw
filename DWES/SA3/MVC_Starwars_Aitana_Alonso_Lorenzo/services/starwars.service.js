const datosRaw = require('../models/starwars.model.json')
const axios = require('axios')

function añadirCampoFoto(datos) {
  return datos.map(p => {
    const nombreBase = p.name.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')
    return { ...p, photo: `/imgs/${nombreBase}.jpg` }
  })
}

let personajes = añadirCampoFoto(datosRaw)

async function getPlaneta(url) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch {
    return null
  }
}

function findAll() {
  return personajes
}

function findByName(name) {
  return personajes.find(p => p.name === name)
}

function update(name, data) {
  const personaje = findByName(name)
  if (personaje) {
    if (data.height) personaje.height = data.height
    if (data.mass) personaje.mass = data.mass
  }
  return personaje
}

function remove(name) {
  personajes = personajes.filter(p => p.name !== name)
}

function findByQuery(query) {
  return personajes.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}

function extractIdFromUrl(url) {
  const match = url.match(/\/people\/(\d+)\//)
  return match ? match[1] : null
}

async function findById(id) {
  const personaje = personajes.find(p => extractIdFromUrl(p.url) === id)
  if (!personaje) return null

  const planeta = await getPlaneta(personaje.homeworld)
  return {
    ...personaje,
    id,
    planet_name: planeta?.name || 'Desconocido',
  }
}

module.exports = {
  findAll,
  findByName,
  findByQuery,
  findById,
  update,
  remove,
  getPlaneta,
}
