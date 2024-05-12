const router=require("express").Router();
const dealController=require("./../controllers/dealController")

router.get("/",dealController.getAll);

router.get("/:id",dealController.getById);


module.exports=router;