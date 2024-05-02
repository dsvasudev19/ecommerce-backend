
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



module.exports={
    createOrder
}