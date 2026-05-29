const bookService = require("../services/book.service")

exports.getAllBooks = async (req, res) => {    
    try {
        const books = await bookService.getAll()
        if(books.length > 0){
            res.status(200).json(books)
        } else {
            res.status(404).json({ msg: "No se encontraron libros" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await bookService.getById(id)
        if(book){
            res.status(200).json(book)
        } else {
            res.status(404).json({ msg: "Libro no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.createBook = async (req, res) => {
    try {
        const newBook = await bookService.create(req.body)
        res.status(201).json({ success: true, data: newBook })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        await bookService.delete(id)
        res.status(200).json({ success: true, msg: "Libro eliminado" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}