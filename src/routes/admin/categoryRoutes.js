const router=require("express").Router();
const categoryController=require("./../../controllers/admin/categoryController")
const {categoryUpload}=require("./../../utils/multer")

router.get("/",categoryController.getAll);

router.get("/:id",categoryController.getById);

router.post("/",categoryUpload.single("image"),categoryController.create);

router.put("/:id",categoryUpload.single("image"),categoryController.updateById);

router.delete("/:id",categoryController.deleteCategory);

module.exports=router;