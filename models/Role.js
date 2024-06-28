const mongoose = require('mongoose');
const roleSchema=new mongoose.Schema({
    name:{
        type :String,
        required:true,
        unique:true,
        enum:["Admin","User","Editeur","role1","role2","role3","role4"]
    },
    permission:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Permission', 
      required: true,
      default:[]
    }]
   
});
const Role = new mongoose.model("Role",roleSchema);
module.exports=Role;