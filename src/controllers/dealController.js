const {Deal}=require("./../models")

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





module.exports={
    getAll,
    getById
}