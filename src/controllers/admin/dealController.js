const {Deal}=require("./../../models")

const getAll=async(req,res,next)=>{
    try {
        const deals=await Deal.findAll();
        if(deals){
            return res.status(200).json({success:true,message:"Successfully Fetched all deals",data:deals})
        }else{
            return res.status(200).json({success:false,message:"No deals found",data:[]})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getById=async()=>{
    try {
        const deal=await Deal.findByPk(req.params.id);
        if(deal){
            return res.status(200).json({success:true,message:"Successfully fetched the Deal",data:deal})
        }else{
            return res.status(200).json({success:true,message:"No Deal found!",data:[]})

        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const create=async(req,res,next)=>{
    try {
        const deal=await Deal.create(req.body);
        if(deal){
            return res.status(200).json({success:true,message:"Successfully Created the Deal",data:deal})
        }else{
            return res.status(400).json({success:false,message:"Error while creating the Deal"})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const update=async(req,res,next)=>{
    try {
        const deal=await Deal.findByPk(req.params.id);
        if(deal){
            await Deal.Update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            return res.status(200).json({success:true,message:"Successfully updated the Deal"})
        }else{
            return res.status(404).json({success:false,message:"No deal found with the given id"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteDeal=async(req,res,next)=>{
    try {
        const deal=await Deal.findByPk(req.params.id);
        if(deal){
            await deal.destroy();
            return res.status(200).json({success:true,message:"Successfully deleted the Deal"})
        }else{
            return res.status(404).json({success:false,message:"No deal found with the given id"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports={
    getAll,
    getById,
    create,
    update,
    deleteDeal
}