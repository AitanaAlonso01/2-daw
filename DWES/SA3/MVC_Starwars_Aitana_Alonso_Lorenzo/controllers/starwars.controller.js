// controllers/starwars.controller.js
const service = require('../services/starwars.service')

exports.list = async (req, res) => {
  const q = req.query.q?.toLowerCase()
  const personajes = service.findAll()

  if (!q) {
    // sin búsqueda → mostrar todos en la galería
    return res.render('listar', { personajes })
  }

  const coincidencias = service.findByQuery(q)

  if (coincidencias.length === 0) {
    // sin coincidencias → mostrar todos en la galería
    return res.render('listar', { personajes })
  }

  // con coincidencias (1 o más) → preparar fichas completas
  const personajesConPlaneta = await Promise.all(
    coincidencias.map(async p => {
      const planeta = await service.getPlaneta(p.homeworld)
      return { personaje: p, planeta }
    })
  )

  return res.render('mostrar', { personajesConPlaneta })
}

exports.show = async (req, res) => {
  const personaje = service.findByName(decodeURIComponent(req.params.nombre))
  const planeta = await service.getPlaneta(personaje.homeworld)
  res.render('mostrar.ejs', { personaje, planeta })
}

exports.edit = (req, res) => {
  const personaje = service.findByName(decodeURIComponent(req.params.nombre))
  if (!personaje) return res.status(404).send('Personaje no encontrado')
  res.render('edit.ejs', { personaje })
}

exports.update = (req, res) => {
  service.update(decodeURIComponent(req.params.nombre), req.body)
  res.redirect(`/starwars/${encodeURIComponent(req.params.nombre)}`)
}

exports.remove = (req, res) => {
  service.remove(decodeURIComponent(req.params.nombre))
  res.redirect('/starwars')
}
