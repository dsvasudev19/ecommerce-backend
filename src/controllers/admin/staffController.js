const {Staff}=require("./../../models")

const getAll=async(req,res,next)=>{
    try {
        const staff=await Staff.findAll();
        if(staff){
            return res.status(200).json({success:true,message:"Successfully fetched the Staff",data:staff})
        }else{
            return res.status(200).json({success:false,message:"No Staff Found",data:[]})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getById=async(req,res,next)=>{
    try {
        const staff=await Staff.findByPk(req.params.id);
        if(staff){
            return res.status(200).json({success:true,message:"Successfully fetched the Staff",data:staff})
        }else{
            return res.status(200).json({success:false,message:"No Staff Found",data:{}})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const create=async(req,res,next)=>{
    try {
        const staff=await Staff.findAll({
            where:{
                [Op.or]:{
                    email:req.body.email,
                    phone:req.body.phone
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const update=async(req,res,next)=>{
    try {
        const staff=await Staff.findByPk(req.params.id);
        if(staff){
            await Staff.Update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            return res.status(200).json({success:true,message:"Successfully Updated the Staff Details",data:staff})
        }else{
            return res.status(404).json({success:false,message:"Staff not found with the given id!"})
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteStaff=async(req,res,next)=>{
    try {
        const staffExists=await Staff.findByPk(req.params.id);
        if(staffExists){
            staffExists.destroy();
             return res.status(200).json({success:true,message:"Successfully Deleted the Staff."})
        }else{
            return res.status(200).json({success:false,message:"Staff Not found with the given id!"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getAll,
    getById,
    create,
    update,
    deleteStaff
}