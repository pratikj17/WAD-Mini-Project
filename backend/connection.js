const mongoose=require('mongoose');
require('dotenv').config()

function connectToDB(url){
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3eot9.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0`).then(()=>console.log("DB connected!"));
}

module.exports={connectToDB};