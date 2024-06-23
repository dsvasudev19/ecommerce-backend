const router=require("express").Router();
const wishlistController=require("./../controllers/wishlistController")

router.get("/",wishlistController.getByUserId)

router.post("/",wishlistController.create)

router.delete("/:id",wishlistController.deleteItem)


module.exports=router;