const router=require("express").Router();
const userController=require("./../../controllers/admin/userController");
const {profileUpload}=require("./../../utils/multer")


router.get("/",userController.getAll);

router.get("/:id",userController.getUserById);

router.post("/",profileUpload.single("image"),userController.create);

router.put("/:id",profileUpload.single("image"),userController.updateById);

router.delete("/:id",userController.deleteuser);


module.exports=router;


