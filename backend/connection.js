const mongoose=require('mongoose');

function connectToDB(url){
    mongoose.connect(url).then(()=>console.log("DB connected!"));
}

module.exports={connectToDB};