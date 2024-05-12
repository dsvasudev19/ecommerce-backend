const router=require("express").Router();
const productController=require("./../controllers/productController")

router.get("/",productController.getAll);

router.get('/:id',productController.getById);

router.get("/category/:categoryId",productController.getSimilarCategoryProducts)



module.exports=router;