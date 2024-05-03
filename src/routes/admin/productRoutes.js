const router=require("express").Router();
const {productUpload}=require("./../../utils/multer")
const productController=require("./../../controllers/admin/productController");



router.get("/",productController.getAll)


router.get("/:id",productController.getById);


router.post("/",productUpload.single("image"),productController.create)

router.put("/:id",productUpload.single("image"),productController.update)


router.delete("/:id",productController.deleteProduct)


router.get("/category/:categoryId",productController.getAllSimilarCategoryProducts);





module.exports=router;