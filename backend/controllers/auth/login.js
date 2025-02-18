const {User}=require('../../model/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

async function handleLogin(req,res){
    const userName=req.body.userName;
    const password=req.body.password;
    if(!userName || !password) return res.json({"error":"Enter valid username and password!"});
    const user=await User.findOne({userName,});
    if(!user) return res.json({"error":"User not found!"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.json({"error":"Invalid Password!"});
    const token=jwt.sign(
        {id:user.id,userName:user.userName},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
    // res.cookie('token',token,{
    //     httpOnly:true,
    //     secure:true,
    //     sameSite:'Strict',
    //     maxAge:60*60*1000
    // });
    return res.json({user,'token':token});
}

module.exports={
    handleLogin,
};