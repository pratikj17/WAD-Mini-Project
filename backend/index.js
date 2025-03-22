const express=require('express');
const {connectToDB}=require('./connection');
const {signupRouter} = require('./routes/auth/signup.route');
const {loginRouter} = require('./routes/auth/login.route');
const { profileRouter } = require('./routes/auth/profiles.route');
const {checkAuthRouter}=require('./routes/auth/checkAuth.route');
const cors=require('cors')
const cookieParser=require("cookie-parser");
require('dotenv').config();

const app=express();
const PORT=4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/checkAuth',checkAuthRouter);
app.use('/profiles',profileRouter);

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));
connectToDB(process.env.DB_URL);