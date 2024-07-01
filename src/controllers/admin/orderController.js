const { Order, OrderItem, Product, Address, Transaction, sequelize } = require('./../../models');
const { Op } = require('sequelize');

// Helper function to calculate total sales amount
const calculateTotalSales = async () => {
  try {
    const result = await Order.aggregate('totalAmount', 'SUM', { where: { status: 'completed' } });
    return result || 0;
  } catch (error) {
    console.error('Error calculating total sales:', error);
    return 0;
  }
};

// Helper function to get total number of orders
const getTotalOrders = async () => {
  try {
    const result = await Order.count();
    return result || 0;
  } catch (error) {
    console.error('Error getting total number of orders:', error);
    return 0;
  }
};

// Helper function to get orders by status
const getOrdersByStatus = async (status) => {
  try {
    const orders = await Order.findAll({ where: { status } });
    return orders || [];
  } catch (error) {
    console.error(`Error getting orders with status ${status}:`, error);
    return [];
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Product] },
        { model: Address, as: 'ShippingAddress' },
        { model: Transaction }
      ]
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        { model: OrderItem, include: [Product] },
        { model: Address, as: 'ShippingAddress' },
        { model: Transaction }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be canceled' });
    }

    await order.update({ status: 'canceled' });

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

const analyticsDashboard = async (req, res) => {
  try {
    const totalSales = await calculateTotalSales();
    const totalOrders = await getTotalOrders();
    const pendingOrders = await getOrdersByStatus('pending');
    const completedOrders = await getOrdersByStatus('completed');
    const canceledOrders = await getOrdersByStatus('canceled');

    res.status(200).json({
      totalSales,
      totalOrders,
      pendingOrders: pendingOrders.length,
      completedOrders: completedOrders.length,
      canceledOrders: canceledOrders.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve analytics data', error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  cancelOrder,
  deleteOrder,
  analyticsDashboard
};
