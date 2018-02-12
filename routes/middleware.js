/**
 * Name : middleware.js 
 * Purpose : Creating all routes middleware
 */
var Users = require('../models/users');
var moment = require('moment');

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
 * @param {object} req 
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

/**
 * Function to check is user have subscription or not
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function isUserSubscribed(req,res,next){
    var token = req.headers.authorization;
    Users
        .findOne({accessToken : token})
        .select({userType:1,stripe:1})
        .then((data)=>{
            if(data.userType == 'free'){
                var isSubscribed = moment().isSameOrBefore(data.stripe.subscription.endDate);
                if(isSubscribed){
                    next()
                } else {
                    res.status(200).send({status: true , message : 'Your subscription has been over'})
                }
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({message:'Whoops Something went wrong!' , status : false})
        })
}

module.exports = {
    isAuthorized,
    isUserExists,
    isUserSubscribed
}