const pedidosController = require('../controllers/pedidos.controller')
const pedidoService = require('../services/pedido.service')
const express = require('express')
const router = express.Router()

// GET - FOrmato JSON
router.get('/json', (req, res) => {
  const pedidos = pedidoService.getAll()
  res.json(pedidos)
})

// Mostrar VISTA EJS index.ejs con listado de pedidos
router.get('/', pedidosController.findAllPedidos)

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
router.get('/:id/newline', pedidosController.showNewLine)
router.post('/:id/newline', pedidosController.newLine)

//Exportar rutas para poder usar en el servidor - Siempre debe exportar las rutas (mejor al final del archivo)
module.exports = router
