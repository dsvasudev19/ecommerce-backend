const router=require("express").Router();
const reviewController=require("./../controllers/reviewController");

router.get("/by/user",reviewController.getAllReviewByUserId);

router.post("/",reviewController.postReview)

router.get("/by/product/:productId",reviewController.getReviewsOfProduct)

router.delete("/:id",reviewController.deleteReview)

module.exports=router;