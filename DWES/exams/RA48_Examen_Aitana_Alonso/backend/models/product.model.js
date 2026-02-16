//npm i mongoose
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    detalles: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        lowercase: true,
        enum: ["tecnologia", "moda", "hogar", "deportes", "otros"]
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    fechaIngreso: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema)

// Crear un nuevo producto
Product.createProduct = async (productData, result) => {
    const newProduct = new Product(productData)
    await newProduct.save()
        .then((datos) => {
            result(null, datos)
        })
        .catch((err) => {
            result(err, null)
        })
}

// Obtener todos los productos con un filtro opcional
Product.findAll = async (filter = {}, result) => {
    const datos = await Product.find(filter)
    if (datos && datos.length > 0) {
        result(null, datos)
    } else {
        result({ "error": "No hay datos" }, null)
    }
}

// Buscar un producto por ID
Product.findProductById = async (id, result) => {
    const datos = await Product.findById(id)
    if (datos) {
        result(null, datos)
    } else {
        result({ "error": "No hay datos" }, null)
    }
}

// Actualizar un producto por ID
Product.updateProductById = async (id, productData, result) => {
    await Product.findByIdAndUpdate(id, productData, { runValidators: true, new: true })
        .then((datosResultado) => {
            result(null, datosResultado)
        })
        .catch((err) => {
            result(err, null)
        })
}

// Eliminar un producto por ID
Product.deleteProductById = async (id, result) => {
    await Product.findByIdAndDelete(id)
        .then((datos) => {
            result(null, datos)
        })
        .catch((err) => {
            result(err, null)
        })
}

// Buscar productos por nombre
Product.findProductByName = async (name, result) => {
    const datos = await Product.find({ nombre: new RegExp(name, 'i') }) // Búsqueda insensible a mayúsculas/minúsculas
    if (datos) {
        result(null, datos)
    } else {
        result({ "error": "No hay datos" }, null)
    }
}

// Exportamos el modelo para el controlador
module.exports = Product
