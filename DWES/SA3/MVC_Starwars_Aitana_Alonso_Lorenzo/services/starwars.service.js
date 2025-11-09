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

  const planeta = personaje.homeworld
    ? await getPlaneta(personaje.homeworld)
    : null

  return {
    ...personaje,
    id,
    planet_name: planeta?.name || 'Desconocido',
  }
}

function create(data) {
  const id = personajes.length + 1
  const url = `https://swapi.dev/api/people/${id}/`

  const photo = data.photo?.startsWith('http')
    ? data.photo
    : `/imgs/${data.name.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '')}.jpg`

  const nuevo = {
    name: data.name,
    height: data.height,
    mass: data.mass,
    hair_color: data.hair_color || '',
    skin_color: data.skin_color || '',
    eye_color: data.eye_color || '',
    birth_year: data.birth_year || '',
    gender: data.gender || '',
    homeworld: data.homeworld || '',
    photo,
    url,
  }

  personajes.push(nuevo)
  return nuevo
}

module.exports = {
  findAll,
  findByName,
  findByQuery,
  findById,
  update,
  remove,
  getPlaneta,
  create,
}
