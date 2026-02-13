const productController = require("../controllers/product.controller")
const express = require("express")
const router = express.Router()

// Ruta para obtener todos los productos
router.get("/", productController.findAllProducts)

// Ruta para obtener un producto por ID
router.get("/:id", productController.findProductById)

// Ruta para crear un nuevo producto
router.post("/", productController.createProduct)

// Ruta para actualizar un producto por ID
router.put("/:id", productController.editProduct)

// Ruta para eliminar un producto por ID
router.delete("/:id", productController.deleteProduct)

module.exports = router