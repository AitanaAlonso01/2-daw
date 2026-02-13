const Order = require('../models/order.model');

// Obtener todos los pedidos
exports.getAll = async () => {
  try {
    const orders = await Order.find()
      .populate('user', 'nombre apellido email') // usa los campos reales del modelo User
      .populate('items.product', 'nombre precio'); // usa los campos reales del modelo Product
    return orders;
  } catch (error) {
    throw new Error('Error al obtener los pedidos: ' + error.message);
  }
};

// Obtener un pedido por ID
exports.getById = async (id) => {
  try {
    const order = await Order.findById(id)
      .populate('user', 'nombre apellido email')
      .populate('items.product', 'nombre precio');
    if (!order) throw new Error('Pedido no encontrado');
    return order;
  } catch (error) {
    throw new Error('Error al obtener el pedido: ' + error.message);
  }
};

// Crear un nuevo pedido
exports.create = async (orderData) => {
  try {
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (error) {
    throw new Error('Error al crear el pedido: ' + error.message);
  }
};

// Actualizar un pedido existente
exports.update = async (id, orderData) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, {
      new: true, // devuelve el documento actualizado
      runValidators: true,
    });
    if (!updatedOrder) throw new Error('Pedido no encontrado');
    return updatedOrder;
  } catch (error) {
    throw new Error('Error al actualizar el pedido: ' + error.message);
  }
};

// Eliminar un pedido
exports.remove = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw new Error('Pedido no encontrado');
    return deletedOrder;
  } catch (error) {
    throw new Error('Error al eliminar el pedido: ' + error.message);
  }
};
