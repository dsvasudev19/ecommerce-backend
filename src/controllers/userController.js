const { User,Media } = require("./../models")
const {Op,sequelize, where}=require("sequelize")
const bcrypt=require("bcrypt");
const { includes } = require("lodash");

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id,{
            include:[
                {
                    model:Media,
                    as:"profile"
                }
            ]
        });
        if (user) {
            return res.status(200).json({ success: true, message: "Successfully Fetched the user", data: user })
        } else {
            return res.status(200).json({ success: false, message: "No user found", data: [] })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const userExists = await User.findOne({
            where: {
                [Op.or]: {
                    email: req.body.email,
                    phone: req.body.phone
                }
            }
        })
        if (!userExists) {
            const user = await User.create({...req.body,password:bcrypt.hashSync(req.body.password,10)});
            if(req.file){
                const mediaData = {
                    mediable_id: user.id,
                    mediable_type: "Profile",
                    url: "",
                    name: req.file.originalname,
                    file_name: req.file.filename,
                    file_type: req.file.mimetype,
                    file_size: req.file.size,
                    path: 'uploads/profileMedia',
                    featured: true,
                }
                const profileMedia=await Media.create(mediaData)
            }
            if (user) {
                return res.status(200).json({ success: true, message: "Successfully Created the User", data: user })
            } else {
                return res.status(400).json({ success: false, message: "Error occured while creating the user" })
            }
        } else {
            return res.status(400).json({ success: false, message: "An Existing user with the given Mail or Phone" })
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
        const userExists = await User.findByPk(req.params.id);
        if(userExists){
            const updatedUser=await User.update({...req.body,password:userExists.password},{
                where:{
                    id:req.params.id
                }
            })
            if(req.file){
                const mediaData = {
                    mediable_id: userExists.id,
                    mediable_type: "Profile",
                    url: "",
                    name: req.file.originalname,
                    file_name: req.file.filename,
                    file_type: req.file.mimetype,
                    file_size: req.file.size,
                    path: 'uploads/profileMedia',
                    featured: true,
                }
                const profileMedia=await Media.Update(mediaData,{
                    where:{
                        mediable_id:userExists.id
                    }
                })
            }
            return res.status(200).json({success:true,message:"Successfully Updated the User details",data:updatedUser})
        }else{
            return res.status(404).json({success:false,message:"No user found"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteuser=async(req,res,next)=>{
    try {
        const userExists=await User.findByPk(req.params.id);
        if(userExists){
            await userExists.destroy();
            return res.status(200).json({success:true,message:"Successfully Deleted the user"})
        }else{
            return res.status(404).json({success:false,message:"No user found"})
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getUserById,
    create,
    deleteuser,
    updateById
}