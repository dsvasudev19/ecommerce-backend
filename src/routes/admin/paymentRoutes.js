const express = require('express');
const router = express.Router();
const paymentAdminController = require('../../controllers/admin/paymentController');

// Get all payments
router.get('/payments', paymentAdminController.getAllPayments);

// Get a single payment by ID
router.get('/payments/:id', paymentAdminController.getPaymentById);

// Cancel a payment
router.put('/payments/:paymentId/cancel', paymentAdminController.cancelPayment);

// Refund a payment
router.post('/payments/:paymentId/refund', paymentAdminController.refundPayment);

// Analytics routes written for dashboard metrics and values
router.get('/analytics/total-payments', paymentAdminController.getTotalPaymentsCount);
router.get('/analytics/total-amount-received', paymentAdminController.getTotalAmountReceived);
router.get('/analytics/total-refunds', paymentAdminController.getTotalRefundsCount);
router.get('/analytics/total-amount-refunded', paymentAdminController.getTotalAmountRefunded);

module.exports = router;
