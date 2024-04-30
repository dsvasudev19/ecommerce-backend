const router=require("express").Router();


const userRoutes=require("./userRoutes");
router.use("/user",userRoutes)

const reviewRoutes=require("./reviewRoutes");
router.use("/review",reviewRoutes)

const categoryRoutes=require("./categoryRoutes");
router.use("/category",categoryRoutes)

module.exports=router;