const router=require("express").Router();
const { resourceUsage } = require("process");
const supportController=require("./../../controllers/admin/supportController")

router.get("/",supportController.getAll)

router.get("/:id",supportController.getById)

router.patch("/:id",supportController.changeStatus)

router.delete("/:id",supportController.deleteEnquiry)


module.exports=router;