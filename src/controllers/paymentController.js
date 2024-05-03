
const instance=require("./../utils/razorpay")

const createOrder=async(req,res,next)=>{
    try {
        var options = {
            amount: req.body.amount,  
            currency: "INR",
          };
        //   const {amount,currency}=req.body;
        instance.orders.create(options, function(err, order) {
            if(!err){
                console.log(order)
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
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const user = { id: 1 };
      let data = await instance.payments.fetch(razorpay_payment_id);
      const { amount, id, currency, status, order_id, method, description } =
        data;

      if (status === "captured") {
        return res.status(200).json({success:true,message:"Your Transaction is Successfull",data:{
            data
        }})
      }
  
      let trans = await Transaction.create({
        userId: user.id,
        orderId: order_id,
        payment_type: method,
        status,
        currency,
        paymentId: id,
        amount: amount / 100,
      });
  
      res
        .status(200)
        .json({ success: true, message: "payment-successfull", payment: trans });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
  

module.exports={
    createOrder,
    validatePayment
}