// controllers/starwars.controller.js
const service = require('../services/starwars.service')

/*exports.list = async (req, res) => {
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
}*/

exports.list = (req, res) => {
  const q = req.query.q?.toLowerCase()
  const personajes = q ? service.findByQuery(q) : service.findAll()
  res.render('listar', { personajes, q })
}

exports.show = async (req, res) => {
  const id = req.params.id
  const q = req.query.q
  const personaje = await service.findById(id)

  if (!personaje) {
    return res.status(404).send('Personaje no encontrado')
  }

  res.render('mostrar.ejs', { personaje, q })
}

exports.edit = async (req, res) => {
  const id = req.params.id
  const personaje = await service.findById(id)
  if (!personaje) return res.status(404).send('Personaje no encontrado')
  res.render('edit', { personaje })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const personaje = await service.findById(id)
  if (!personaje) return res.status(404).send('Personaje no encontrado')

  service.update(personaje.name, req.body)
  res.redirect(`/personajes/${id}`)
}

exports.remove = (req, res) => {
  const id = req.params.id
  const personaje = service.findById(id)
  if (!personaje) return res.status(404).send('Personaje no encontrado')

  service.remove(personaje.name)
  res.redirect('/starwars')
}
