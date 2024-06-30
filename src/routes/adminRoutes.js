const router=require("express").Router();


const authRoutes=require("./admin/authRoutes")
router.use("/auth",authRoutes)

const categoryRoutes=require("./admin/categoryRoutes")
router.use("/category",categoryRoutes)

const subCategoryRoutes=require("./admin/subCategoryRoutes")
router.use("/sub-category",subCategoryRoutes)

const productRoutes=require("./admin/productRoutes")
router.use("/product",productRoutes)

const userRoutes=require("./admin/userRoutes")
router.use("/user",userRoutes)

const staffRoutes=require("./admin/staffRoutes")
router.use("/staff",staffRoutes)

const orderRoutes=require("./admin/orderRoutes")
router.use("/orders",orderRoutes)

const paymentRoutes=require("./admin/paymentRoutes")
router.use("/payment",paymentRoutes)

const reviewRoutes=require("./admin/reviewRoutes")
router.use("/reviews",reviewRoutes)

const supportRoutes=require("./admin/supportRoutes")
router.use("/support",supportRoutes)

module.exports=router;