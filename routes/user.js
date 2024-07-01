const express = require('express');
const router = express.Router();


const User = require('../models/user');
const Role = require('../models/Role')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendConfirmationEmail} = require('../nodemailer');

const { ObjectId } = require('mongoose');

const verifierRole = require('../middlwares/verifierRole')
const verifierToken = require('../middlwares/verifierToken')


const connectEnsureLogin=require('connect-ensure-login');


const chars="0123456789AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopmlkjhgfdsqwxcvbn";
let activationCode="";
for(let i =0;i<25;i++){
    activationCode+=chars[Math.floor(Math.random()*chars.length)];

}
// fct de creation de user
const newUser=function(){
    return (
        async(req, res) => {
            data= req.body;
            usr= new User(data);
            
            //verification d'email dupliqueé
            user1= await User.findOne({email:usr.email});
            if(user1){
                console.log("🚀 ~ router.post ~ email déja existant:",usr.email )
                res.status(409).send('email déja existant')
            }else{
                salt=bcrypt.genSaltSync(10);// generate random string pour hasher pwd
                cryptedPass = await bcrypt.hashSync(data.passWord,salt)  ; 
                usr.isActive=false
                usr.role='66630bc63e2b9f14de48b45d'
                usr.passWord=cryptedPass;//enregistrer la pwd crypteé dan la bd
                usr.activationCode=activationCode;
            
                usr.save()
                .then((saved) => {
                    console.log("🚀 ~ .then ~ saved:", saved);
                    res.status(200).send(saved);
                })
                    
                .catch((err) => {
                    res.status(400).send(err);
                });
            
            //utuliser  la methode sendConfirmationEmail
            sendConfirmationEmail(usr.email, usr.activationCode);
        
            }
        
        }
    )
        
    
}
// registration
router.post('/register',newUser());




   
//mail confirmation
   
router.get('/confirmation/:activationCode',async(req,res)=>{
try{
    console.log("🚀 ~ router.get ~ activationCode:", activationCode)
    user=await User.findOne({activationCode:req.params.activationCode})
    if(!user){
        res.sendStatus(404)
    }else{
        user.isActive=true
        user.save()
        res.status(200).send({message:"compte activé"})
    }
}catch(e){
     res.status(500).send('error')
}
    
   })


    //login
    router.post('/login',async(req,res)=>{
        data=req.body;
       
        user1= await User.findOne({email:data.email});
        if(!user1){
            console.log("🚀 ~ router.post ~ user1:", user1)
            res.status(404).send('email or password inexistant')

        }else{
            validPass=await bcrypt.compare(data.passWord,user1.passWord)
            // console.log("🚀 ~ router.post ~ validPass:", validPass)
            // console.log("🚀 ~ router.post ~ !validPass:", !validPass)
            // console.log("🚀 ~ router.post ~ user1.passWord:", user1.passWord)
            // console.log("🚀 ~ router.post ~ data.passWord:", data.passWord)
            if(!validPass){
                res.status(404).send('email or password inexistant')
            }else{
                if ( !user1.isActive){
                    console.log("🚀 ~ router.post ~ user1:", user1)
                    console.log("🚀 ~ router.post ~ user1.isActive:", user1.isActive)
                    return res.status(401).send({
                        token:null,
                        message:"verifier votr mail"
                    });
                }else{

                    payload={
                        nom:user1.nom,
                        email:user1.email,
                        _id:user1._id,
                        role:user1.role,
                        permission:user1.permission,
                        salair:user1.salair
                    }
                    token=jwt.sign(payload,"123456789", { expiresIn: '100h' })
                    res.status(200).send({token:token})
    
                }}
               
            }
        }
        
    )
    
//requete de logout
const invalidToken = require('../config/invalidToken');
router.post('/logout',verifierToken,(req,res)=>{
    const token=req.headers['authorization'].split(' ')[1];
    invalidToken.push(token);
    res.status(200).send("logout succesful")
})




// const verifierPermission=require('../middlwares/verifierPermission')

//     //donner salair pour user specifique
//     AfficherSalair="AfficherSalair"
//     router.get('/getsalair',verifierPermission(AfficherSalair), (req,res)=>{
        
//             User.findOne({salair:req.user.salair})
//         .then(
//             (usr)=>{
                
//                 //res.send(usr)// temchi mregla
//                 //res.send(usr.salair);// erreur express deprecated res.send(status): Use res.sendStatus(status) instead
//                 res.json(usr.salair);//l coorection ta3 l'erreur b .json fi 3odh .send ki chtab3ath att bark mch objet JSON kamel
//             }
//         )
//         .catch(
//             (err)=>{
//                 res.send(err);//tab3ath erreur lel partie front
//             }
//         )
       
//     })

    
  
    
const verifierPermission=require('../middlwares/verifierPermission')

// ajouter des user par l'admin
CreateUser="CreateUser"
router.post("/adduser",verifierPermission(CreateUser),newUser())




//afficher touts le user
     router.get('/getuser',verifierRole(), (req,res)=>{
          User.find()
        .then(
             (users)=>{
                res.status(200).json(users);
             })
        .catch(
             (err)=>{
                 res.status(500).send(err);
                })
            })
 



// modification de role
ModifierRole="ModifierRole"
router.patch('/update/:id',verifierPermission(ModifierRole),(req,res)=>{
    myid=req.params.id;
    newData=req.body;
    User.findOneAndUpdate({_id:myid},newData)
    .then(
        (updated)=>{
            console.log(updated);
            res.send(updated);
        })
    .catch(
        (err)=>{
            res.send(err);
        })


})

router.get('/userInfo/:myEmail',(req,res)=>{
    User.findOne({email:myEmail})
    .then(
        (usr)=>{
            res.send(usr);
        })
    .catch(
        (err)=>{
            res.send(err);
        })
})



module.exports= router;