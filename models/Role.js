const mongoose = require('mongoose');
const roleSchema=new mongoose.Schema({
    name:{
        type :String,
        required:true,
        unique:true
    },
    permission:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Permission', 
      required: true,
    }]
});
const Role = new mongoose.model("Role",roleSchema);
module.exports=Role;