const { Op } = require("sequelize");
const { Staff, RefreshToken } = require("./../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Staff.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const validUser = bcrypt.compareSync(req.body.password, user.password);
      if (!validUser) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Username or password" });
      } else {
        const jwttoken = jwt.sign(
          { id: user.id, email: user.email },
          "adminsecret"
        );
        const refreshtoken = RefreshToken.create(user);
        res.cookie("token", jwttoken);
        res.cookie("refreshToken", refreshtoken);
        return res
          .status(200)
          .json({
            success: true,
            message: "Successfully Logged in!.",
            data: { token: jwttoken, refreshToken: refreshtoken },
          });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const signup=async(req,res,next)=>{
    try {
        const userExists=await Staff.findOne({
            where:{
                [Op.or]:{
                    email:req.body.email,
                    phone:req.body.phone
                }
            }
        })
        if(userExists){
            return res.status(400).json({success:false,message:"Already a User Exists with the given mail or Password"})
        }else{
            const user=await Staff.create(req.body);
            if(user){
                return res.status(200).json({success:true,message:"User SignUp Successfull.....!"})
            }else{
                return res.status(400).json({success:false,message:"Error while Sign Up"})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserByToken=async(req,res,next)=>{
    try {
        const token=req.cookie.token;
        if(!token){
            return res.status(401).json({success:false,message:"Login Token Not found.....!!"})
        }
        const {id,email}=jwt.verify(token,"abcdefgh");
        if(!id){
            return res.status(401).json({success:false,message:"Invalid Login Token"})
        }
        const user=await Staff.findByPk(id);
        if(!user){
            return res.status(401).json({success:false,message:"User not found"});
        }
        
        else{
            return res.status(200).json({success:true,message:"User Details fetched successfully",data:user})
        }
        
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    login,
    signup,
    getUserByToken
}