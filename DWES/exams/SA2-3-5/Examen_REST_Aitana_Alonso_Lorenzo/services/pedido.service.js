let pedidos = require('../models/pedidos.model.json')
const { v4: uuidv4 } = require('uuid')

// Devolver todos los pedidos
exports.getAll = () => pedidos

// Devolver un pedido por id
exports.getById = id_pedido => pedidos.find(c => c.id_pedido == id_pedido)

// Crear un nuevo pedido
exports.create = datos => {
  const pedido = {
    id_pedido: uuidv4(),
    cliente: datos.cliente,
    fecha_pedido: datos.fecha_pedido,
    lineas_pedido: [
      {
        producto: datos.producto,
        precio_und: parseFloat(datos.precio_und),
        cantidad: parseInt(datos.cantidad),
        descuento: parseFloat(datos.descuento) / 100,
      },
    ],
  }

  pedidos.push(pedido)
  return pedido
}

// Update un pedido
exports.update = (id_pedido, datos) => {
  const pedido = pedidos.find(p => p.id_pedido == id_pedido)
  if (!pedido) return null

  pedido.cliente = datos.cliente
  pedido.fecha_pedido = datos.fecha_pedido

  return pedido
}

// Eliminar un pedido
exports.delete = id_pedido => {
  pedidos = pedidos.filter(c => c.id_pedido != id_pedido) // crea un array nuevo sin el pedido
  //  que queremos eliminar
  return pedidos
}

// Agregar una linea de pedido
exports.addLine = (id_pedido, linea) => {
  const pedido = pedidos.find(p => p.id_pedido == id_pedido)
  if (!pedido) return null

  pedido.lineas_pedido = pedido.lineas_pedido || []
  pedido.lineas_pedido.push(linea)

  return pedido
}
