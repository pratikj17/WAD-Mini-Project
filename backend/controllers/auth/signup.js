const {User}=require('../../model/users');
const bcrypt=require('bcrypt');

async function handleSignUp(req,res){
    const userName=req.body.userName;
    const password=req.body.password;
    if(!userName || !password) return res.json({"error":"Enter valid username and password!"});
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(password,saltRounds);
    const result=await User.create({
        userName: userName,
        password: hashedPassword
    });
    return res.json(result);
}

module.exports={
    handleSignUp,
};