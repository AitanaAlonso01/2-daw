// unico archivo que usa los req y res
const PlayerService = require('../services/players.service')

exports.findAllPlayers = (req, res) => {
  const players = PlayerService.getAll()
  res.render('index.ejs', { players: players })
}

exports.showNewPlayer = (req, res) => {
  res.render('new.ejs')
}

exports.createPlayer = (req, res) => {
  PlayerService.create(req.body)
  res.redirect('/players')
}

exports.deletePlayer = (req, res) => {
  const { id } = req.params
  PlayerService.delete(id) // eliminamos el pedido
  res.redirect('/players') // redirigimos al listado de players
}
