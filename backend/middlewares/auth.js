const jwt=require('jsonwebtoken');
require('dotenv').config();

async function verifyAuthentication(req,res,next){
    const token=req.headers.token;
    if(!token) return res.json({'error':'token not found!'});
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(err){
        return res.json({'error':'invalid token!'});
    }
}

module.exports={
    verifyAuthentication: verifyAuthentication,
}