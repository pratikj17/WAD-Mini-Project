const express=require('express');
const { handleSignUp } = require('../../controllers/auth/signup');

const router=express.Router();

router.route('/').post(handleSignUp);

module.exports={signupRouter: router};