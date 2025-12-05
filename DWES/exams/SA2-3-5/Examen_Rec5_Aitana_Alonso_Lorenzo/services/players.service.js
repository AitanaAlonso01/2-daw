let players = require('../models/players.json')

// Devolver todos los jugadores
exports.getAll = () => players

// Crear nuevo jugador
exports.create = datos => {
  const player = {
    id: players.length + 1,
    nombre: datos.nombre,
    apellido: datos.apellido,
    edad: datos.edad,
    posicion: datos.posicion,
    equipo: datos.equipo,
  }

  players.push(player)
  return player
}

// Eliminar jugador
exports.delete = id => {
  players = players.filter(c => c.id != id) // crea un array nuevo sin el player que queremos eliminar
  return players
}
