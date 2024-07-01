const { where } = require("sequelize");
const {Review}=require("./../../models")


const getAll=async(req,res,next)=>{
    try {
        const reviews=await Review.findAll();
        return res.status(200).json({success:true,message:"Successfully fetched all reviews",data:reviews})
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const getById=async(req,res,next)=>{
    try {
        const review=await Review.findByPk(req.params.id)
        return res.status(200).json({success:true,message:"Successfully fetched the review",data:review})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteReview=async(req,res,next)=>{
    try {
        const review=await Review.findByPk(req.params.id)
        if(!review){
            return res.status(404).json({success:false,message:"No Review found with the given id"})
        }
        await review.destroy();
        return res.status(200).json({success:true,message:"Successfully deleted the review"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getReviewsOfProduct=async(req,res,next)=>{
    try {
        const reviews=await Review.findAll({
            where:{
                reviewable_id:req.params.productId
            }
        })
        if(reviews){
            return res.status(200).json({success:true,message:"Successfully fetched reviews of products",data:reviews})
        }
        return res.status(200).json({success:false,message:"Not found any reviews of products",data:[]})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports={
    getAll,
    getById,
    deleteReview,
    getReviewsOfProduct
}