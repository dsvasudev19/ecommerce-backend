const { Order, OrderItem, Product, Address, Transaction, sequelize } = require('./../models');
const { refundInitiate } = require('./paymentController');

const createOrder = async (req, res) => {
    const { items, address, payment } = req.body;
    const userId = req.user.id;
  
    const transaction = await sequelize.transaction();
  
    try {
      // Create Address
      const newAddress = await Address.create({
        userId,
        type: 'shipping',
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country
      }, { transaction });
  
      // Create Order
      const newOrder = await Order.create({
        userId,
        totalAmount: items.reduce((total, item) => total + (item.quantity * item.price), 0),
        status: 'pending',
        shippingAddressId: newAddress.id
      }, { transaction });
  
      // Create OrderItems
      const orderItems = items.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));
      await OrderItem.bulkCreate(orderItems, { transaction });
  
      // Decrement the quantity of each product
      for (let item of items) {
        const product = await Product.findByPk(item.productId, { transaction });
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ID: ${item.productId}`);
        }
        await product.decrement('stock', { by: item.quantity, transaction });
      }
  
      // Create Payment
      const newTransaction = await Transaction.create({
        userId,
        orderId: newOrder.id,
        payment_type: payment.paymentType,
        status: 'pending',
        currency: payment.currency,
        paymentId: payment.paymentId,
        amount: payment.amount
      }, { transaction });
  
      // Commit transaction
      await transaction.commit();
  
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
  
    } catch (error) {
      // Rollback transaction in case of error
      await transaction.rollback();
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  };
  

const getOrdersByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.findAll({
      where: { userId },
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
  const userId = req.user.id;

  try {
    const order = await Order.findOne({
      where: { id, userId },
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
  const userId = req.user.id;

  const transaction = await sequelize.transaction();

  try {
    const order = await Order.findOne({
      where: { id, userId },
      include: [{ model: Transaction }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    // Initiate refund
    const refundResult = await refundInitiate(order.Transaction.paymentId, order.totalAmount);

    if (!refundResult.success) {
      throw new Error('Failed to initiate refund');
    }

    // Update order status
    await order.update({ status: 'canceled' }, { transaction });

    // Update transaction status
    await order.Transaction.update({ status: 'refunded' }, { transaction });

    await transaction.commit();

    res.status(200).json({ message: 'Order cancelled and refund initiated' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  cancelOrder
};
