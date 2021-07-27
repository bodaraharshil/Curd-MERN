const express=require("express");
const mongoose=require("mongoose");
const app=express();
const PORT=5000;
const { MONGOURI } =require("./connect");
const bodyParser = require('body-parser')

mongoose.connect(MONGOURI,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
});
mongoose.connection.on("connected",()=>{
    console.log("mongodb to connect")
})
mongoose.connection.on("error",(error)=>{
    console.log("error :",error);
})
app.use('/public', express.static('uploads'))
//models
const Superlogin=require("./models/superadmin");
const Admin=require("./models/admin");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
  }));

//api
// app.use(express.json());
app.use(require("./routes/user"));


app.listen(PORT,()=>{
    console.log("server runing:",PORT);
})