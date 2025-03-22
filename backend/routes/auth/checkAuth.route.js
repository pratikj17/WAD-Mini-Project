const express=require('express');
const { checkAuth } = require('../../controllers/auth/checkAuth.controller');
const { verifyAuthentication } = require('../../middlewares/auth.middleware');

const router=express.Router();

router.route('/').post(verifyAuthentication,checkAuth);

module.exports={checkAuthRouter: router};