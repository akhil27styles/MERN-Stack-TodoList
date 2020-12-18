const mongoose=require('mongoose');
const FriendSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:false,
    },
    description:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    }
});

const FriendModel=mongoose.model('friends',FriendSchema)
module.exports=FriendModel;
