// único archivo que usa los req y res
const PedidoService = require('../services/pedido.service')

// el controller se puede apoyar de vistas o JSON
exports.findAllPedidos = (req, res) => {
  const pedidos = PedidoService.getAll()
  res.render('index.ejs', { pedidos: pedidos })
}

exports.findPedidoById = (req, res) => {
  const { id } = req.params
  const pedido = PedidoService.getById(id)

  if (!pedido) {
    return res.status(404).json('pedido no encontrado')
  }

  // Calcular subtotal
  const subtotal = pedido.lineas_pedido.reduce((acc, l) => {
    const totalLinea = l.precio_und * l.cantidad * (1 - l.descuento)
    return acc + totalLinea
  }, 0)

  // Calcular IVA (21%)
  const iva = +(subtotal * 0.21).toFixed(2)

  // Calcular total
  const total = +(subtotal + iva).toFixed(2)

  res.render('show.ejs', { pedido, subtotal, iva, total })
}

exports.showNewPedido = (req, res) => {
  res.render('new.ejs')
}

exports.createPedido = (req, res) => {
  PedidoService.create(req.body)
  res.redirect('/pedidos')
}

exports.showEditPedido = (req, res) => {
  const { id } = req.params
  const pedido = PedidoService.getById(id) // cargamos el pedido
  if (pedido) {
    res.render('edit.ejs', { pedido })
  } else {
    res.status(404).json('pedido no encontrado')
  }
}

exports.editPedido = (req, res) => {
  const { id } = req.params
  PedidoService.update(id, req.body) // actualizamos el pedido
  res.redirect('/pedidos') // redirigimos al listado de pedidos
}

exports.deletePedido = (req, res) => {
  const { id } = req.params
  PedidoService.delete(id) // eliminamos el pedido
  res.redirect('/pedidos') // redirigimos al listado de pedidos
}

exports.showNewLine = (req, res) => {
  const { id } = req.params
  const pedido = PedidoService.getById(id)

  if (!pedido) {
    return res.status(404).send('Pedido no encontrado')
  }

  res.render('newline.ejs', { pedido })
}

exports.newLine = (req, res) => {
  const { id } = req.params
  PedidoService.addLine(id, req.body)
  res.redirect(`/pedidos/${id}`)
}
