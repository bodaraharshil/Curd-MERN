const mongoose=require("mongoose");

const newuserschema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Photo:{
        type:String,
        required:true
    },
    Address:{   
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Cpassword:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("admin",newuserschema);