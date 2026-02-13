const ProductModel = require("../models/product.model")

exports.findAllProducts = async (req, res) => {
    await ProductModel.findAll({}, function (err, productos) {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(productos)
        }
    })
}

exports.findProductById = async (req, res) => {
    const { id } = req.params
    await ProductModel.findProductById(id, function (err, producto) {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(producto)
        }
    })
}

exports.createProduct = async (req, res) => {
    await ProductModel.createProduct(req.body, function (err, productCreated) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(productCreated)
        }
    })
}

exports.editProduct = async (req, res) => {
    const { id } = req.params
    const { nombre, detalles, precio, categoria, stock } = req.body
    const productoActualizado = {
        nombre: nombre,
        detalles: detalles,
        precio: precio,
        categoria: categoria,
        stock: stock
    }
    await ProductModel.updateProductById(id, productoActualizado, function (err, datosActualizados) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(datosActualizados)
        }
    })
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    await ProductModel.deleteProductById(id, function (err, datosEliminados) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(datosEliminados)
        }
    })
}