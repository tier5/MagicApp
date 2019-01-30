/**
 * Name : middleware.js 
 * Purpose : Creating all routes middleware
 */
var Users = require('../models/users');
var moment = require('moment');
var {retriveSubscription} = require('../helpers/stripe');
var multer = require('multer');

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
        .select({userType:1,stripe:1, isSubscribed: 1, isHookedUser: 1})
        .then((data)=>{
            if(data.userType == 'paid'){
                if (data.isHookedUser){
                    next();
                }
                if ( data.isSubscribed ){
                    next();
                } else {
                    return res.status(400).send({message : 'Your subscription failed', status: false});
                }
            } else {
                next();
            }
        })
        .catch(err => {
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

/**
 * Upload a file if exists in multipart/form-data
 */
  const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
  }); 
module.exports = {
    isAuthorized,
    isUserExists,
    isUserSubscribed,
    onlyAdminCan,
    upload
}