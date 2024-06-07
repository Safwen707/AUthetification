const mongoose =require('mongoose')
const RessourceSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
    
})
const Ressource= new mongoose.model('Ressource',RessourceSchema)
module.exports=Ressource;