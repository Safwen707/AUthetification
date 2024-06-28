const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

const verifierRole = require('../middlwares/verifierRole')
const verifierToken = require('../middlwares/verifierToken');
const adminRole="66630b9a2e92ee4420e7b5a7";
const verifierPermission=require('../middlwares/verifierPermission')
// create un role
const CreateRole="CreateRole"
router.post('/addrole',verifierPermission(CreateRole) ,(req,res)=>{
    data=req.body;
    role = new Role(data);
    role.save()
    .then(
        (saved)=>res.send(saved)
    )
    .catch(
        (err)=>res.status(400).send(err)
    )
        
    

})









module.exports= router;