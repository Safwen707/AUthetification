const mongoose =require('mongoose')


const PermissionSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    },
    resource:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resource', 
        required: true,
        
    }],
    action:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Action', 
        required: true,
        
    }]

})
const Permission= new mongoose.model('Permission',PermissionSchema)
module.exports=Permission;


