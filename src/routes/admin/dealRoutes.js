const router=require("express").Router();
const dealController=require("./../../controllers/admin/dealController")

router.get("/",dealController.getAll);

router.get("/:id",dealController.getById);

router.post("/",dealController.create);

router.put("/:id",dealController.update);

router.delete("/:id",dealController.deleteDeal)

module.exports=router;

