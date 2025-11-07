let pedidos = require('../models/pedidos.model.json')

// Devolver todos los pedidos
exports.getAll = () => pedidos

// Devolver un pedido por id
exports.getById = id_pedido => pedidos.find(c => c.id_pedido == id_pedido)

// Crear un nuevo pedido
exports.create = datos => {
  datos.id = pedidos.length + 1
  pedidos.push(datos)
  return datos
}

// Update un pedido
exports.update = (id_pedido, datos) => {
  const pedido = pedidos.find(c => c.id_pedido == id_pedido)
  if (!pedido) {
    return null
  } else {
    pedido.cliente = datos.cliente
    pedido.fecha_pedido = datos.fecha_pedido
    pedido.lineas_pedido = datos.lineas_pedido
    pedido.lineas_pedido.forEach(l => {
      l.producto = l.producto.toUpperCase()
      l.precio_und = parseFloat(l.precio_und)
      l.cantidad = parseInt(l.cantidad)
      l.descuento = parseFloat(l.descuento)
    })
    return pedido
  }
}

// Eliminar un pedido
exports.delete = id_pedido => {
  pedidos = pedidos.filter(c => c.id_pedido != id_pedido) // crea un array nuevo sin el pedido
  //  que queremos eliminar
  return pedidos
}

// Agregar una linea de pedido
exports.addLine = id_pedido => {
  const pedido = pedidos.find(c => c.id_pedido == id_pedido)
  pedido.lineas_pedido.push(req.body)
  return pedido
}
