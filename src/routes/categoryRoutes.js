const router=require("express").Router();
const categoryController=require("./../controllers/categoryController")

router.get("/",categoryController.getAll)

router.get("/:id",categoryController.getById)


module.exports=router;