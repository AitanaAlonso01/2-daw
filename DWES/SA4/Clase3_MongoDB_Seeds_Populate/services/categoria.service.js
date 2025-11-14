const catModel = require('../models/categorias.model')

// Devolver todas las categorias
exports.getAll = async () => await catModel.find()

// Devolver una categoria por su ID
exports.getById = async id => await catModel.findById(id)

// Crear una categoria
exports.create = async categoria => {
  const newCat = new catModel({ nombre: categoria.nombre.toLowerCase() })
  return await newCat.save()
}

// Actualizar una categoria
exports.update = async (id, categoria) => {
  return await catModel.findByIdAndUpdate(id, categoria, { new: true })
}

// Eliminar una categoria
exports.delete = async id => {
  return await catModel.findByIdAndDelete(id)
}
