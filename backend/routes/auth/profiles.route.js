const express=require('express');
const {verifyAuthentication}=require('../../middlewares/auth.middleware')

const router=express.Router();

router.route('/').get(verifyAuthentication,(req,res)=>{
    res.json({'msg':'Page Accessible!'});
});

module.exports={
    profileRouter:router,
}; 