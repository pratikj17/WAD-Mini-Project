const {User}=require('../../model/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

async function handleLogin(req,res){
    try {
        const {email,userName,password}=req.body;
        if(!email || !userName || !password) return res.status(400).json({"error":"Enter username,email and password!"});
        const user=await User.findOne({userName});
        if(!user) return res.status(404).json({"error":"User not found!"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({"error":"Invalid credentials!"});
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:true,
            sameSite:'Strict',
            maxAge:2*60*60*1000
        });
        return res.json({"userName":user.userName});
    } catch (error) {
        console.log("Error in login: "+error);
    }
}

module.exports={
    handleLogin,
};