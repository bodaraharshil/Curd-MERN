const mongoose=require("mongoose");

const superloginshcema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("super_admin",superloginshcema);