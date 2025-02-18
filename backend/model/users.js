const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const users=mongoose.model('users',userSchema);

module.exports={
    User: users
};