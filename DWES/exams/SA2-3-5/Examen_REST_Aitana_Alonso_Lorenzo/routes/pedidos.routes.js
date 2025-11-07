const pedidosController = require('../controllers/pedidos.controller')
const express = require('express')
const router = express.Router()

// Mostrar VISTA EJS index.ejs con listado de pedidos
router.get('/pedidos', pedidosController.findAllPedidos)

//Mostrar VISTA EJS new.ejs para crear un nuevo pedido
router.get('/new', pedidosController.showNewPedido)
router.post('/', pedidosController.createPedido) // POST - Crear un nuevo pedido

// Mostrar VISTA EJS show.ejs con un pedido específico
router.get('/:id', pedidosController.findPedidoById)

// Mostrar VISTA EJS edit.ejs para editar un pedido (GET)
router.get('/:id/edit', pedidosController.showEditPedido)

// PATCH - Updatear un pedido
router.patch('/:id', pedidosController.editPedido)

// DELETE - Eliminar un pedido
router.delete('/:id', pedidosController.deletePedido)

// POST - Agregar una linea de pedido
router.post('/:id/newline', pedidosController.newLine)

//Exportar rutas para poder usar en el servidor - Siempre debe exportar las rutas (mejor al final del archivo)
module.exports = router
