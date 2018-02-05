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
// Used using user registration 
function isUserExists(req,res,next){
    Users.findOne({email:req.body.email}).then((user)=>{
        console.log(user)
        if(user) {
            res.status(400).send({message: 'User Already exists!', status : false })
        } else {
            next()
        }
    })
}
module.exports = {
    isAuthorized,
    isUserExists
}