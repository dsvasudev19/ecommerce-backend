const router=require("express").Router();

const categoryRoutes=require("./admin/categoryRoutes")
router.use("/category",categoryRoutes)

const userRoutes=require("./admin/userRoutes")
router.use("/user",userRoutes)

const productRoutes=require("./admin/productRoutes")
router.use("/product",productRoutes)

const subCategoryRoutes=require("./admin/subCategoryRoutes")
router.use("/sub-category",subCategoryRoutes)

module.exports=router;