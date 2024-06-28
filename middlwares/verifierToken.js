const jwt = require('jsonwebtoken');
const User = require('../models/user');
const invalidToken = require('../config/invalidToken');

// tokenMiddleware
function verifierToken(req,res,next){
    const authHeader = req.headers['authorization'];//  extraction de token de l'entete  de requette sous la forme "barer token"
    //console.log(authHeader)
    const token =authHeader && authHeader.split(' ')[1]  ;
    //console.log(token);
    if(token == null) return res.sendStatus(401);
    if (invalidToken.includes(token) ){
        return res.sendStatus(403).json('logouted')
    };
    jwt.verify(token,"123456789",(err,user)=>{
        if(err) {
            return res.sendStatus(403).json('err');//Utiliser return dans ce contexte permet de sortir immédiatement de la fonction, empêchant toute exécution ultérieure du code dans cette fonction utilisez toujours return après res.sendStatus() dans un middleware pour garantir une exécution correcte et prévisible de votre code :.
        }
        req.user=user;
        console.log(user);
        
        next()
    })
    
    
}
module.exports=verifierToken;
