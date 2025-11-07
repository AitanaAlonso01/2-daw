// único archivo que usa los req y res
const PedidoService = require('../services/pedido.service')

// el controller se puede apoyar de vistas o JSON
exports.findAllPedidos = (req, res) => {
  const pedidos = PedidoService.getAll()
  res.render('index.ejs', { pedidos: pedidos })
}

exports.findPedidoById = (req, res) => {
  const { id_pedido } = req.params
  const pedido = PedidoService.getById(id_pedido)
  if (pedido) {
    res.render('show.ejs', { pedido })
  } else {
    res.status(404).json('pedido no encontrado') // devolvemos un mensaje de error por JSON
  }
}

exports.showNewPedido = (req, res) => {
  res.render('new.ejs')
}

exports.createPedido = (req, res) => {
  PedidoService.create(req.body)
  res.redirect('/pedidos')
}

exports.showEditPedido = (req, res) => {
  const { id_pedido } = req.params
  const pedido = PedidoService.getById(id_pedido) // cargamos el pedido
  if (pedido) {
    res.render('edit.ejs', { pedido })
  } else {
    res.status(404).json('pedido no encontrado')
  }
}

exports.editPedido = (req, res) => {
  const { id_pedido } = req.params
  PedidoService.update(id_pedido, req.body) // actualizamos el pedido
  res.redirect('/pedidos') // redirigimos al listado de pedidos
}

exports.deletePedido = (req, res) => {
  const { id_pedido } = req.params
  PedidoService.delete(id_pedido) // eliminamos el pedido
  res.redirect('/pedidos') // redirigimos al listado de pedidos
}

exports.newLine = (req, res) => {
  const { id_pedido } = req.params
  PedidoService.addLine(id_pedido) // agregamos una linea de pedido
  res.redirect('/pedidos') // redirigimos al listado de pedidos
}
