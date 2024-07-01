const express = require('express');
const router = express.Router();
const orderController = require('./../../controllers/admin/orderController');

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get a single order by ID
router.get('/:id', orderController.getOrderById);

// Route to cancel an order
router.put('/cancel/:id', orderController.cancelOrder);

// Route to delete an order
router.delete('/:id', orderController.deleteOrder);

// Route to get analytics dashboard data
router.get('/analytics/dashboard', orderController.analyticsDashboard);

module.exports = router;
