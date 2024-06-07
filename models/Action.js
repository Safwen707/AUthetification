const mongoose =require('mongoose')

const ActionSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
    
})
const Action= new mongoose.model('Action',ActionSchema)
module.exports=Action;