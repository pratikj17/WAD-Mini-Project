const express=require('express');
const { handleLogin } = require('../../controllers/auth/login.controller');

const router=express.Router();

router.route('/').post(handleLogin);

module.exports={loginRouter: router};