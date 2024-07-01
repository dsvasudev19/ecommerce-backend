const router=require("express").Router();
const reviewController=require("./../../controllers/admin/reviewController");
const { route } = require("./paymentRoutes");

router.get("/", reviewController.getAll)

router.get("/:id",reviewController.getById)

router.delete("/:id",reviewController.deleteReview)

router.get("/product/:productId",reviewController.getReviewsOfProduct)


module.exports=router;