const {User}=require('../../model/users.model');
const bcrypt=require('bcrypt');

async function handleSignUp(req,res){
    try {
        console.log(req.body);
        const {email,userName,password}=req.body;
        if(!email || !userName || !password) return res.json({"error":"Enter valid email,username and password!"});
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        const result=await User.create({
            email: email,
            userName: userName,
            password: hashedPassword
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log("Error in signup: "+error);
    }
}

module.exports={
    handleSignUp,
};