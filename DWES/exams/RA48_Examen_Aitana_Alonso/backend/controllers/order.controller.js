const orderService = require('../services/order.service');

// Obtener todos los pedidos
exports.getAll = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un pedido por ID
exports.getById = async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Crear un nuevo pedido
exports.create = async (req, res) => {
  try {
    const newOrder = await orderService.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un pedido existente
exports.update = async (req, res) => {
  try {
    const updatedOrder = await orderService.update(req.params.id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un pedido
exports.remove = async (req, res) => {
  try {
    const deletedOrder = await orderService.remove(req.params.id);
    res.status(200).json({
      message: 'Pedido eliminado correctamente',
      deletedOrder,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
