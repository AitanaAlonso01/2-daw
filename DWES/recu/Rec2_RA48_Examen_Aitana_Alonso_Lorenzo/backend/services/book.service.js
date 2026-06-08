const bookModel = require("../models/book.model")

// Devolver todos los libros
exports.getAll = async () => await bookModel.find()

// Obtener libro por ID
exports.getById = async (id) => await bookModel.findById(id)

// Crear un nuevo libro
exports.create = async (bookData) => {
    const newBook = new bookModel(bookData)
    return await newBook.save()
}

// Actualizar un libro
exports.update = async (id, updateData) => {
    return await bookModel.findByIdAndUpdate(id, updateData, { new: true })
}

// Eliminar un libro
exports.delete = async (id) => await bookModel.findByIdAndDelete(id)