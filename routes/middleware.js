/**
 * Name : middleware.js 
 * Purpose : Creating all routes middleware
 */
var Users = require('../models/users');

/**
 * Function for autorization checking 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next
 * @returns res or pass to the next  
 */
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
/**
 * Function for user's exists or not 
 * @param {object} res 
 * @param {object} next 
 * @returns res or pass it to the next function 
 */
function isUserExists(req,res,next){
    Users.findOne({email:req.body.email}).then((user)=>{
        //console.log(user)
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