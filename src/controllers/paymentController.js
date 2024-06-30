
const instance=require("./../utils/razorpay")
const {Transaction}=require("./../models")

const createOrder=async(req,res,next)=>{
    try {
        var options = {
            amount: req.body.amount,  
            currency: "INR",
          };
        //   const {amount,currency}=req.body;
        instance.orders.create(options, function(err, order) {
            if(!err){
                return res.status(200).json({success:true,message:"Successfully Created an Payment Order",data:order})
            }else{
                return res.status(400).json({success:false,message:"Error while Creating an Payment Order"})
            }
          });
          
    } catch (error) {
        console.log(error);
        next(error);
    }

}

const validatePayment = async (req, res, next) => {
  console.log("hitting this payment verification handler")
    try {
      console.log(req.body)
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const user = { id: 1 };
      let data = await instance.payments.fetch(razorpay_payment_id);
      console.log(data)
      const { amount, id, currency, status, order_id, method, description } =
        data;
      
      if (status === "captured") {
        let trans = await Transaction.create({
          userId: user.id,
          orderId: order_id,
          payment_type: method,
          status,
          currency,
          paymentId: id,
          amount: amount / 100,
        });

        return res.status(200).json({success:true,message:"Your Transaction is Successfull",data:{
            data
        }})
      }
  
      
      res
        .status(400)
        .json({ success: false, message: "Payment Failed, If amount is deducted we will initiate a refund", data: trans });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
  
  const refundInitiate = async (req, res, next) => {
    try {
      const { paymentId } = req.body;
      const transaction = await Transaction.findOne({ where: { paymentId } });
  
      if (!transaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }
  
      instance.payments.refund(paymentId, { amount: transaction.amount * 100, speed: 'normal' }, async (err, refund) => {
        if (!err) {
          await transaction.update({ status: 'refunded' });
  
          return res.status(200).json({
            success: true,
            message: "Refund initiated successfully",
            data: refund
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Error while initiating refund",
            error: err.message
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

module.exports={
    createOrder,
    validatePayment,
    refundInitiate
}