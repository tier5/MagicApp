/**
 * Name : middleware.js 
 * Purpose : Creating all routes middleware
 */
var Users = require('../models/users');
var moment = require('moment');
var {retriveSubscription} = require('../helpers/stripe');

/**
 * Function for autorization checking 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next
 * @returns res or pass to the next  
 */
function isAuthorized(req,res,next){
    var token = req.headers.authorization || req.headers.token
    Users
        .findOne({accessToken : token})
        .then(function(user){
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
            if(data.userType == 'paid'){
                return retriveSubscription(data.stripe.subscription.id)
                    .then(data=>{
                        if (data.status =='active'){
                            next()
                        } else {
                            res.status(401).send({message : 'Your subscription is get over due to payment issue'})
                        }
                    }).catch(err=> console.error('middleware.js line 60',err))
            } else {
                next();
            }
        })
        .catch(err => {
            console.error('middleware.js line 70', err);
            res.status(500).send({message:'Something Went Wrong!' , status : false})
        })
}

/**
 * function to check only Admin can go further or not  
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next 
 * @returns response  
 */

function onlyAdminCan(req,res,next){
    var token = req.headers.authorization ;
    Users
        .findOne({accessToken: token, isAdmin: true})
        .select({email:1,isAdmin: 1})
        .then(admin=>{
            if (admin){
                next()
            } else {
                res.status(403).send({message: `You're are not allowed!`, status: false});
            }
        })
        .catch(err=> console.log(err));
}

module.exports = {
    isAuthorized,
    isUserExists,
    isUserSubscribed,
    onlyAdminCan
}