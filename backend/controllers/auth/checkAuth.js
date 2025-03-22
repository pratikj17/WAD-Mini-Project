async function checkAuth(req,res){
    try{
        res.status(200).json(req.user);
    }catch(error){
        return res.status(500).send("CheckAuth failed: "+error);
    }
}

module.exports={checkAuth,};