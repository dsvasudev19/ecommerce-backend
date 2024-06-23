const router=require("express").Router();
const subCategoryController=require("./../../controllers/admin/subCategoryController")
const {subCategoryUpload}=require("./../../utils/multer")

router.get("/",subCategoryController.getAll);

router.get("/:id",subCategoryController.getById)

router.post("/",subCategoryUpload.single("image"),subCategoryController.create);

router.put("/:id",subCategoryUpload.single("image"),subCategoryController.update)

router.delete("/:id",subCategoryController.deleteById)

module.exports=router;