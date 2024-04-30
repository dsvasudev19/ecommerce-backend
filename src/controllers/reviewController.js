const { where } = require("sequelize");
const {Review}=require("./../models")

const getAllReviewByUserId=async(req,res,next)=>{
    try {
        const {userId}=req.body;
        // const userId=req.user.id; after adding user auth uncomment this
        const reviews=await Review.findAll({where:{
            userId
        }})
        if(reviews){
            return res.status(200).json({success:true,message:"Successfully fetched all the Reviews of the user",data:reviews})
        }else{
            return res.status(200).json({success:true,message:"No reviews found associated with this user"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteReview=async(req,res,next)=>{
    try {
        const review=await Review.findByPk(req.params.id);
        if(review){
            await review.destroy();
            return res.status(200).json({success:true,message:"Successfuly deleted the review"})
        }
        else{
            return res.status(404).json({success:false,message:"No review found"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const postReview=async(req,res,next)=>{
    try {

        const review=await Review.create(req.body);
        if(review){
            return res.status(200).json({success:true,message:"Successfully posted a review",data:review})
        }else{
            return res.status(400).json({success:false,message:"Error while posting a review"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const getReviewsOfProduct=async(req,res,next)=>{
    try {
        const reviews=await Review.findAll({where:{
            reviewable_id:req.params.productId
        }})
        if(reviews){
            return res.status(200).json({success:true,message:"Successfully Fetched the reviews of the product",data:reviews})
        }else{
            return res.status(200).json({success:false,message:"No review found",data:[]})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports={
    getAllReviewByUserId,
    postReview,
    deleteReview,
    getReviewsOfProduct
}

