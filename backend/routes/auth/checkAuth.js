const express=require('express');
const { checkAuth } = require('../../controllers/auth/checkAuth');
const { verifyAuthentication } = require('../../middlewares/auth');

const router=express.Router();

router.route('/').post(verifyAuthentication,checkAuth);

module.exports={checkAuthRouter: router};