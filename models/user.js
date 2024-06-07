const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
   nom:String,
   //prenom: String,
   email:String,
   passWord:String,
   salair:{
      type:Number,
      defaulte:0},
   /*isActive:{
    type:Boolean,
    defaulte:false,
   },*/
   //activationCode:String,
   role:{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Role', 
      required: true,
      
   }
   
    
});
const user= new mongoose.model("user",userSchema);


module.exports=user;