const instance = require("./../../utils/razorpay");
const { Transaction, User, Order } = require("./../../models");

// Get all payments
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Transaction.findAll({
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Order, attributes: ["totalAmount"] },
      ],
    });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Transaction.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Order, attributes: ["totalAmount"] },
      ],
    });

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Cancel a payment
const cancelPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    let data = await instance.payments.fetch(paymentId);
    if (data.status === "captured") {
      return res
        .status(400)
        .json({ success: false, message: "Cannot cancel a captured payment" });
    }

    let cancelledPayment = await instance.payments.cancel(paymentId);

    let transaction = await Transaction.findOne({ where: { paymentId } });
    await transaction.update({ status: "cancelled" });

    res
      .status(200)
      .json({
        success: true,
        message: "Payment cancelled successfully",
        data: cancelledPayment,
      });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Refund a payment
const refundPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const transaction = await Transaction.findOne({ where: { paymentId } });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    instance.payments.refund(
      paymentId,
      { amount: transaction.amount * 100, speed: "normal" },
      async (err, refund) => {
        if (!err) {
          await transaction.update({ status: "refunded" });

          return res.status(200).json({
            success: true,
            message: "Refund initiated successfully",
            data: refund,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Error while initiating refund",
            error: err.message,
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Analytics: Total payments count
const getTotalPaymentsCount = async (req, res, next) => {
  try {
    const totalPayments = await Transaction.count();
    res.status(200).json({ success: true, data: totalPayments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Analytics: Total amount received
const getTotalAmountReceived = async (req, res, next) => {
  try {
    const totalAmount = await Transaction.sum("amount");
    res.status(200).json({ success: true, data: totalAmount });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Analytics: Total refunds count
const getTotalRefundsCount = async (req, res, next) => {
  try {
    const totalRefunds = await Transaction.count({
      where: { status: "refunded" },
    });
    res.status(200).json({ success: true, data: totalRefunds });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Analytics: Total amount refunded
const getTotalAmountRefunded = async (req, res, next) => {
  try {
    const totalRefundedAmount = await Transaction.sum("amount", {
      where: { status: "refunded" },
    });
    res.status(200).json({ success: true, data: totalRefundedAmount });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  cancelPayment,
  refundPayment,
  getTotalPaymentsCount,
  getTotalAmountReceived,
  getTotalRefundsCount,
  getTotalAmountRefunded,
};
