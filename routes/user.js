const express = require('express');
const router = express.Router();


const User = require('../models/user');
const Role = require('../models/Role')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../nodemailer');

const { ObjectId } = require('mongoose');

const verifierRole = require('../middlwares/verifierRole')
const verifierToken = require('../middlwares/verifierToken')





/*const chars="0123456789AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopmlkjhgfdsqwxcvbn";
let activationCode="";
for(let i =0;i<25;i++){
    activationCode+=chars[Math.floor(Math.random()*chars.length)];

}*/

// registration
router.post('/register',async(req, res) => {
    data= req.body;
    console.log(data);
    usr= new User(data);
    

    salt=bcrypt.genSaltSync(10);// generate random string pour hasher pwd
    cryptedPass = await bcrypt.hashSync(data.passWord,salt)  ; 
     
    usr.passWord=cryptedPass;//enregistrer la pwd crypteé dan la bd
    //usr.activationCode=activationCode;

    usr.save()
    .then((saved) => {
        res.status(200).send(saved);
    })
    .catch((err) => {
        res.status(400).send(err);
    });

//utuliser  la methode sendConfirmationEmail
sendConfirmationEmail(usr.email, usr.activationCode);

});


    //login
    router.post('/login',async(req,res)=>{
        data=req.body;
        user1= await User.findOne({email:data.email});
        if(!user1){
            res.status(404).send('email or password invalid')

        }else{
            validPass=bcrypt.compare(data.passWord,user1.passWord)
            if(!validPass){
                res.status(404).send('email or password invalid')

            }else{
                /*if ( !user.isActive){
                    return res.send({
                        accessToken:null,
                        message:"verifier votr mail"
                    });
                }else{*/

                    payload={
                        nom:user1.nom,
                        email:user1.email,
                        _id:user1._id,
                        role:user1.role,
                        salair:user1.salair
                    }
                    token=jwt.sign(payload,"123456789", { expiresIn: '1h' })
                    res.status(200).send({token:token})
    
                }
               
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






    //donner salair pour user specifique
    router.get('/getsalair',verifierToken,(req,res)=>{
        
            User.findOne({salair:req.user.salair})
        .then(
            (usr)=>{
                
                //res.send(usr)// temchi mregla
                //res.send(usr.salair);// erreur express deprecated res.send(status): Use res.sendStatus(status) instead
                res.json(usr.salair);//l coorection ta3 l'erreur b .json fi 3odh .send ki chtab3ath att bark mch objet JSON kamel
            }
        )
        .catch(
            (err)=>{
                res.send(err);//tab3ath erreur lel partie front
            }
        )
       
    })

    const adminRole="66630b9a2e92ee4420e7b5a7";
  
    


    // ajouter des user par l'admin
    
     router.post("/adduser",verifierRole(adminRole),(req,res)=>{
        data= req.body;
        console.log(data);
        

        usr= new User(data);
        usr.save()
            .then(
                (savedU)=>res.send(savedU)
            )
            .catch(
                (err)=>{
                    res.send(err)
                }

            )

     })
// modification de role
router.patch('/update/:id',verifierRole(adminRole),(req,res)=>{
    myid=req.params.id;
    newData=req.body;
    User.findOneAndUpdate({_id:myid},newData)
    .then(
        (updated)=>{
            console.log(updated);
            res.send(updated);
            
        }
    )

    
    .catch(
        (err)=>{
            res.send(err);
        }
    )


})



module.exports= router;