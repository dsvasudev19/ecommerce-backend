const { where } = require("sequelize");
const {Product}=require("./../../models");
const category = require("../../models/category");
const { get } = require("lodash");

const getAll=async(req,res,next)=>{
    try {
        // TODO:Need to modify logic to get images also 
        const products=await Product.findAll();
        if(products){
            return res.status(200).json({success:true,message:"Successfully fetched all products",data:products})
        }else{
            return res.status(200).json({success:false,message:"No products found",data:[]})
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getById=async(req,res,next)=>{
    try {
        // TODO:include media to get images, need to modified after writing associations
        const product=await Product.findByPk(req.params.id);
        if(product){
            return res.status(200).json({success:true,message:"Successfully fetched the product",data:product})
        }else{
            return res.status(200).json({success:false,message:"No product found",data:[]})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const create=async(req,res,next)=>{
    try {
        const product=await Product.create(req.body);
        if(product){
            return res.status(200).json({success:true,message:'Successfully Created the Product',data:product})
        }else{
            return res.status(200).json({success:false,message:"Error while creating the product"})
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const update=async(req,res,next)=>{
    try {
        const product=await Product.findByPk(req.params.id);
        if(product){
            await Product.Update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            return res.status(200).json({success:true,message:"Successfully Updated the Product"})
        }else{
            return res.status(404).json({success:false,message:"Product Not found."})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteProduct=async(req,res,next)=>{
    try {
        const product=await Product.findByPk(req.params.id);
        if(product){
            await product.destroy();
            return res.status(200).json({success:true,message:"Successfully deleted the product"})
        }else{
            return res.status(404).json({success:false,message:"Product Not found"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const getAllSimilarCategoryProducts=async(req,res,next)=>{
    try {
        const products=await Product.findAll({
            where:{
                categoryId:req.params.categoryId
            }
        })
        if(products){
            return res.status(200).json({success:true,message:"Successfully fetched all products",data:products})
        }else{
            return res.status(200).json({success:false,message:"No products found",data:[]})
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAll,
    getById,
    create,
    update,
    deleteProduct,
    getAllSimilarCategoryProducts
}