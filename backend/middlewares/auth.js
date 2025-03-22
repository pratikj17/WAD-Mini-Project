const jwt=require('jsonwebtoken');
const {User}=require('../model/users');
require('dotenv').config();

async function verifyAuthentication(req,res,next){
    try{
        const token=req.cookies.jwt;
        if(!token) return res.status(404).json({'error':'token not found!'});
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        if(verified){
            const user=await User.findById(verified.userId).select("-password");
            req.user=user;
            next();
        }
        else return res.status(401).json({"error":"Unauthorized user!"});
    }
    catch(err){
        return res.json({'error':'invalid token!'});
    }
}

module.exports={
    verifyAuthentication: verifyAuthentication,
}