const router=require("express").Router();
const orderController=require("./../controllers/orderController")

router.post("/",orderController.createOrder)

router.get("/:id",orderController.getOrderById)

router.get("/user/",orderController.getOrdersByUser)

router.post("/cancel-order/:id",orderController.cancelOrder)


module.exports=router;