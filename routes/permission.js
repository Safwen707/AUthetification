const express = require('express');
const router = express.Router();
const mongoose=require("mongoose")

const verifierRole = require('../middlwares/verifierRole')
const verifierToken = require('../middlwares/verifierToken')
const verifierPermission=require('../middlwares/verifierPermission')
const User = require('../models/user');
const Role = require('../models/Role')

//ajouter une permission 
const AjouterPermission="AjouterPermission"
router.patch("/addpermission/:id",verifierPermission(AjouterPermission),async(req,res)=>{
    id_role=req.params.id//id mta3 role elli bech tzidou permission
    newData=[]
    
    permissions=req.body.permission// el id ta3 l permission elli bech tzidha
    permissions = permissions.map(id =>new mongoose.Types.ObjectId(id));
    await Role.findOne({_id:id_role})
        .then(
            (role)=>{
                newData=permissions.concat(role.permission)
                newData={permission:newData}//newData hia l permission l9dima w tzidha el permission elli jet me requete  :permissions  hia liste wuser.permission hia id ta3 permission  
                console.log(newData)   
            }
        )
        .catch(
            (err)=>{
                res.status(500).send(err)
            }
        )


    Role.findOneAndUpdate({_id:id_role},newData)
    .then(
        (updated)=>{
            console.log(updated);
            res.send(updated);
            
        }
    )
    .catch(
        (err)=>{
            res.status(500).send(err)
        }
    )


})
module.exports=router;