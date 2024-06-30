const router=require("express").Router();
const supportController=require("./../controllers/supportController")

router.post("/",supportController.sendSupportEnquiry)

module.exports=router;