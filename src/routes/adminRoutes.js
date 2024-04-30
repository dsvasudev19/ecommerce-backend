const router=require("express").Router();

const categoryRoutes=require("./admin/categoryRoutes")
router.use("/category",categoryRoutes)

const userRoutes=require("./admin/userRoutes")
router.use("/user",userRoutes)

module.exports=router;