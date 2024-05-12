const { get } = require("lodash");
const category = require("../models/category");
const {Product,Media}=require("./../models")

const getAll=async(req,res,next)=>{
    try {
        const products=await Product.findAll();
        if(products){
            return res.status(200).json({message:"Successfully fetched all products",data:products,success:true})
        }else{
            return res.status(200).json({message:"No products found!",data:[],success:false})
        }
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getById=async(req,res,next)=>{
    try {
        const product=await Product.findByPk(req.params.id)
        if(product){
            return res.status(200).json({message:"Successfully fetched the product",data:product,success:true})
        }else{
            return res.status(200).json({message:"No product found!",data:{},success:false})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getSimilarCategoryProducts=async(req,res,next)=>{
    try {
        const products=await Product.findAll({
            where:{
                category:req.params.categorId
            }
        })
        if(products){
            return res.status(200).json({message:"Successfully fetched all Similar products",data:products,success:true})
        }else{
            return res.status(200).json({message:"No Similar products found!",data:[],success:false})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports={
    getAll,
    getById,
    getSimilarCategoryProducts
}