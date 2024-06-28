/*const express = require('express');

const mongoose=require("mongoose")
const Permission = require('../models/permission');
const jwt = require('jsonwebtoken');
const invalidToken = require('../config/invalidToken');
const Role = require('../models/Role');

function verifierPermission(PermissionAutorise){
    return(req,res,next)=>{

    const authHeader = req.headers['authorization'];//  extraction de token de l'entete  de requette sous la forme "barer token"
    //console.log(authHeader)
    const token =authHeader && authHeader.split(' ')[1]  ;
    //console.log(token);
    if(token == null) return res.sendStatus(401);
    if (invalidToken.includes(token) ){
        return res.json("session expiré(logout)")
    };
    jwt.verify(token,"123456789",(err,user)=>{
        if(err) {
            return res.json("token expiré").send(401);//Utiliser return dans ce contexte permet de sortir immédiatement de la fonction, empêchant toute exécution ultérieure du code dans cette fonction utilisez toujours return après res.sendStatus() dans un middleware pour garantir une exécution correcte et prévisible de votre code :.
        }
        req.user=user;
        console.log(user.role);
        const UserRole=Role.findOne({_id:user.role})//objet de type Role 3andou nom w liste DEs objet permission
        console.log("rrrrrr")
        console.log(UserRole)
        console.log("rrrrrr")
        const UserPermissions=UserRole.permission//liste feha les _id ta3 objet pemission
        PermissionAutorise =  Permission.find({name:PermissionAutorise})//objet de type permission 3andou nom w _id(pour verifier apré si ella existe dans la base de donée)
       
        try{
            
            
            if(!PermissionAutorise){
                res.status(500).json("permission inexistante")
            }
            if( UserPermissions.includes(PermissionAutorise._id) ){
                next()
            }else{
                res.status(401).json("permission invalid") 
            }
            


        } catch(error){
            console.error(error);
            return res.sendStatus(500);

        }
}
)}}
module.exports=verifierPermission;*/

/*
const express = require('express');

const mongoose=require("mongoose")
const Permission = require('../models/permission');
const jwt = require('jsonwebtoken');
const invalidToken = require('../config/invalidToken');
const Role = require('../models/Role');
let UserPermissions;
let PermissionAutorise ;
function verifierPermission(PermissionAutorise){
    return async(req,res,next)=>{

    const authHeader = req.headers['authorization'];//  extraction de token de l'entete  de requette sous la forme "barer token"
    //console.log(authHeader)
    const token =authHeader && authHeader.split(' ')[1]  ;
    //console.log(token);
    if(token == null) return res.sendStatus(401);
    if (invalidToken.includes(token) ){
        return res.json("session expiré(logout)")
    };
    jwt.verify(token,"123456789",(err,user)=>{
        if(err) {
            return res.json("token expiré").send(401);//Utiliser return dans ce contexte permet de sortir immédiatement de la fonction, empêchant toute exécution ultérieure du code dans cette fonction utilisez toujours return après res.sendStatus() dans un middleware pour garantir une exécution correcte et prévisible de votre code :.
        }
        req.user=user;
        console.log(user.role);
        Role.findOne({ _id: user.role })
        .then(UserRole => {
            UserPermissions=UserRole.permission//liste feha les _id ta3 objet pemission
            
        })
        .catch((err) => {
            res.send(err)
            
        });
    //objet de type Role 3andou nom w liste DEs objet permission
       
       
        
        Permission.find({name:PermissionAutorise})
        .then(perm=> {
            PermissionAutorise=perm
        })
        .catch(err => {
            res.send(err)
        });//objet de type permission 3andou nom w _id(pour verifier apré si ella existe dans la base de donée)
       
        try{
            console.log("rrrr")
            console.log( PermissionAutorise)
            console.log( PermissionAutorise[0]._id)
            if(!PermissionAutorise){
                res.status(500).json("permission inexistante")
            }
            
            if( UserPermissions.includes(new mongoose.Types.ObjectId(PermissionAutorise[0]._id)) ){
                next()
            }else{
                res.status(401).json("permission invalid") 
            }
            


        } catch(error){
            console.error(error);
            return res.sendStatus(500);

        }
}
)}}
module.exports=verifierPermission;*/


const express = require('express');

const mongoose=require("mongoose")
const Permission = require('../models/permission');
const jwt = require('jsonwebtoken');
const invalidToken = require('../config/invalidToken');
const Role = require('../models/Role');
const User = require('../models/user');
let UserPermissions;
let user;
function verifierPermission(PermissionAutorise){
    return async (req,res,next)=>{
        
    const authHeader = req.headers['authorization'];//  extraction de token de l'entete  de requette sous la forme "barer token"
    const token =authHeader && authHeader.split(' ')[1]  ;
    
    if(token == null) return res.sendStatus(401);
    if (invalidToken.includes(token) ){
        return res.json("session expiré(logout)")
    };
    jwt.verify(token,"123456789",async(err,userParam)=>{
        if(err) {
            return res.json("token expiré").send(401);//Utiliser return dans ce contexte permet de sortir immédiatement de la fonction, empêchant toute exécution ultérieure du code dans cette fonction utilisez toujours return après res.sendStatus() dans un middleware pour garantir une exécution correcte et prévisible de votre code :.
        }
        user=userParam;
    
    }) 
    UserRole= await Role.findOne({ _id: user.role })
        
    UserPermissions=UserRole.permission//liste feha les _id ta3 objet pemission
    
    permissionAutorise =await Permission.find({name:PermissionAutorise})
        
    //kan famm pb ki kanet PermissionAutorise
      
       
        try{
            
            console.log( permissionAutorise)
            if(!permissionAutorise){
                res.status(401).send({message:"permission inexistante"})
            }
            if( UserPermissions.includes(new mongoose.Types.ObjectId(permissionAutorise[0]._id)) ){
              
                next()
            }else{
                console.log("ttttt")
                console.log(permissionAutorise[0])
                res.status(401).json("permission invalid") 
            }
            


        } catch(error){
            console.log("error")
            console.log(error)
            return res.sendStatus(500)

        }    
        


    
        }

    
    
}
module.exports=verifierPermission;