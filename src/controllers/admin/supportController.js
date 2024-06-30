const {Support}=require("./../../models")

const getAll=async(req,res,next)=>{
    try {
        const supports=await Support.findAll();
        return res.status(200).json({success:true,message:"Successfully fetched all support enquiries",data:supports})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getById=async(req,res,next)=>{
    try {
        const support=await Support.findByPk(req.params.id)
        return res.status(200).json({success:true,message:"Successfully fetched the Support Enquiry with given id",data:support})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteEnquiry=async(req,res,next)=>{
    try {
        const support=await Support.findByPk(req.params.id)
        if(!support){
            return res.status(404).json({success:false,message:"No Enquiry found with given id"})
        }
        await support.destroy();
        return res.status(200).json({success:true,message:"Successfully deleted the support enquiry"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const changeStatus=async(req,res,next)=>{
    try {
        const support=await Support.findByPk(req.params.id)
        if(!support){
            return res.status(404).json({success:false,message:"No Enquiry found with given id"})
        }
        await support.update({status:req.body.status})
        return res.status(200).json({success:true,message:"Successfully changed the status of Support Enquiry"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports={
    getAll,
    getById,
    deleteEnquiry,
    changeStatus
}