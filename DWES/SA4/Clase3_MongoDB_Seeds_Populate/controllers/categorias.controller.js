const CatService = require('../services/categoria.service')

// GET /categorias
exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await CatService.getAll()
    res.status(200).json(categorias)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /categorias/:id
exports.getByIdCategoria = async (req, res) => {
  try {
    const id = req.params
    const categoria = await CatService.getById(id)
    res.status(200).json(categoria)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//POST /categorias
exports.createCategoria = async (req, res) => {
  try {
    const newCat = await CatService.create(req.body)
    res.status(201).json(newCat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//PUT /categorias/:id
exports.updateCategoria = async (req, res) => {
  try {
    const updateCat = await CatService.update(req.params.id, req.body)
    res.status(200).json(updateCat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE /categorias/:id
exports.deleteCategoria = async (req, res) => {
  try {
    const deleteCat = await CatService.delete(req.params.id)
    res.status(200).json(deleteCat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
