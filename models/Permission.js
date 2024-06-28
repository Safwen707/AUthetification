const mongoose =require('mongoose')


const PermissionSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    }})
const Permission= new mongoose.model('Permission',PermissionSchema)
module.exports=Permission;


