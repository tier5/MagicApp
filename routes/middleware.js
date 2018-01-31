var Users = require('../models/users');
function isAuthorized(req,res,next){
    var token = req.headers.authorization || req.headers.token
    Users.findOne({accessToken : token}).then(function(user){
        if(user){
            next()
        } else {
            res.status(401).send({message:'Unauthorized',status:false})
        }
    })
}

module.exports = {
    isAuthorized
}