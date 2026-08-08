
const jwt=require('jsonwebtoken');
const User = require('../modules/user');
const redisClient=require('../config/redis')

const adminMiddleware=async (req,res,next)=>{
  try{
    const {token}=req.cookies;
    if(!token){
      throw new Error("Invalid Token");
    }
    const payload= jwt.verify(token,process.env.JWT_SECRET)
    const {_id}=payload;
    if(!_id){
      throw new Error("Invalid token");
    }

    const result=await User.findById(_id);

    if(payload.role!='admin'){
      throw new Error("Invalid Error")
    }

    if(!result){
      throw new Error("User doesn't Exit");
    }
    //redis ke blocklist me present to nnhi hia
    const IsBlocked=await redisClient.exists('token:${token}')
    if(IsBlocked){
      throw new Error("Invalid token")
    }
    req.result=result;
    next()
  }
  catch(err){
    res.status(503).send("Error: "+err.message)
  }
}

module.exports=adminMiddleware