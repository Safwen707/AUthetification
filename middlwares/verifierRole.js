const jwt = require('jsonwebtoken');
//verifierRoleMiddleWare

const invalidToken = require('../config/invalidToken');
const User = require('../models/user');
function verifierRole(roleAutorise){
    /*hajty b role yet3adda fel parametre bech nverifi bih  e role elli chan5thou mel paylode ta3 token
     mech kima verifierToken e  nverifi e token elli  na5thou mel header ta3 requet 
     bel SecretCode elli tgenera beha "jwt.verify(token,"123456789")"
     donc na3ml fonction ta5ou e roleAutorisé en parametre w traja3li middlewar bech n7otha fel 
     requete ta3 l'ajout des utilisateur par l'admin*/
    return function(req,res,next)
    {
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
            console.log(user);
            const roleUser=user.role;
            try {
                // Récupérez le rôle administrateur depuis la base de données
                const adminRole =  Role.findOne({ name: 'Admin' });
                if (!adminRole) {
                    return res.sendStatus(500); // Rôle admin non trouvé
                }

                // Comparer le rôle de l'utilisateur avec le rôle administrateur
                if (user.role === adminRole._id.toString()) {
                    next();
                } else {
                    return res.sendStatus(403); // Accès interdit
                }

            } catch (error) {
                console.error(error);
                return res.sendStatus(500); // Erreur du serveur
            }
        });
    };
}

module.exports=verifierRole;










