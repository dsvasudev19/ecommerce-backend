const router=require('express').Router();

const paymentController=require("./../controllers/paymentController")

router.post("/create-payment-order",paymentController.createOrder)

router.post("/validate-payment",paymentController.validatePayment)


module.exports=router;