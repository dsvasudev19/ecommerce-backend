const { where } = require("sequelize");
const {Wishlist}=require("./../models")

const getAll=async(req,res,next)=>{
    try {
        const wishlists=await Wishlist.findAll();
        if(wishlists){
            return res.status(200).json({success:true,message:"Successfully fetched wishlist items",data:wishlists})
        }else{
            return res.status(200).json({success:false,message:"No wishlist items found",data:[]})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getByUserId=async(req,res,next)=>{
    try {
        const items=await Wishlist.findAll({
            where:{
                //TODO:later need to get from req.user.id
                userId:req.body.userId
            }
        })
        if(items){
            return res.status(200).json({success:true,message:"Successfully fetched wishlist items",data:items})
        }else{
            return res.status(200).json({success:false,message:"Wishlist is empty",data:[]})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const create=async(req,res,next)=>{
    try {
        const item=await Wishlist.create({userId:req.body.userId,productId:req.body.productId})
        return res.status(200).json({success:true,message:"Successfully added item to wishlist",data:item})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteItem=async(req,res,next)=>{
    try {
        const item=await Wishlist.findByPk(req.params.id)
        if(item){
            await item.destroy();
            return res.status(200).json({success:true,message:"Successfully deleted item from wishlist"})
        }
        return res.status(404).json({success:true,message:"Item not found in wishlist"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports={
    getAll,
    getByUserId,
    create,
    deleteItem
}