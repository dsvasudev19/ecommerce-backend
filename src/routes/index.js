const router=require("express").Router();


const userRoutes=require("./userRoutes");
router.use("/user",userRoutes)

const reviewRoutes=require("./reviewRoutes");
router.use("/review",reviewRoutes)

const categoryRoutes=require("./categoryRoutes");
router.use("/category",categoryRoutes)

const paymentRoutes=require("./paymentRoutes")
router.use("/payment",paymentRoutes)

const wishlistRoutes=require("./wishlistRoutes")
router.use("/wishlist",wishlistRoutes)

const orderRoutes=require("./orderRoutes")
router.use("/orders",orderRoutes)

module.exports=router;