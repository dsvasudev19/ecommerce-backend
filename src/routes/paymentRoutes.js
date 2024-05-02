const router=require('express').Router();

const paymentController=require("./../controllers/paymentController")

router.post("/create-payment-order",paymentController.createOrder)


module.exports=router;