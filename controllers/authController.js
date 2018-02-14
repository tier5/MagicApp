/**
 * Name: authController.js
 * Purpose : Authentication controller
 */
var Users = require('../models/users');
var bcrypt = require('bcrypt');
var moment = require('moment');
var {createCustomer , createSubscription, createCharge, deleteCustomer , retrieveCustomer} = require('../helpers/stripe');
var {sendForgetPasswordMail} = require('../helpers/nodemailer.js');
var jwt = require('jsonwebtoken');

// addDate method to date object 
Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
}


/**
 * function to register a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function userRegister(req,res,next){
  var body = req.body;
  var userType = body.userType; // 'paid' or 'free';
  body.stripe= {};
  body.stripe.plan = {
      id : body.plan.id
  };
  body.stripe.cards=[];
  // creating an object to store card details
  if(body.card.id !== null){
    var card = {
        id : body.card.id,
        isDefault : true
    };
    body.stripe.cards.push(card);
  }
  // create customer for the stripe 
  createCustomer(body,userType)
        .then((customer)=>{
            body.stripe.customer = {
                id : customer.id
            }
            return createSubscription(body.stripe.customer.id,body.stripe.plan.id)
        }) // create a subscription 
        .then((subscription)=>{
            // adding subscribtion id to the body 
            body.stripe.subscription = {
                id : subscription.id,
            };
            // start date and end date of the subscription
            var startDate = new Date ;
            var endDate = startDate.addDays(body.plan.trial_period_days);
            body.stripe.subscription.startDate = startDate ;
            body.stripe.subscription.endDate = moment(endDate).format();
            body.accessToken = jwt.sign({ email: body.email },"amagiczap.com");
            var user = new Users(body)
            return user.save();
        }) // create a user 
        .then((user)=>{
            var sendUserData = {
                email : user.email,
                name : user.name,
                isAdmin: user.isAdmin,
                isActive:user.isActive,
                isSubscribed : true
            }
            return res.status(200).send({status:true,message:"User created", token:user.accessToken , user:sendUserData})
        })
        .catch((err)=>{
            console.log(err);

            deleteCustomer(body.customerId)
                .then(confirmed => console.log('deleted'))
                .catch(err=>console.log(err));

            return res.status(400).send({status:false,message: 'Somthing Went Wrong!'});
        })
}

/**
 * function to login a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function userLogin(req,res,next){
    var { email, password } = req.body;

    Users
        .findOne({email})
        .select({ email:1,password:1,stripe:1,isActive:1,isAdmin:1,userType:1, accessToken: 1})
        .then(user=>{
            bcrypt
                .compare(password, user.password, (err, data) => {
                    if (data) {
                        if(user.userType == 'free'){
                            var currentDate = new Date ;
                            var isSubscribed = moment(currentDate).isSameOrBefore(user.stripe.subscription.endDate)
                            var sendUserData ={
                                email : user.email,
                                name : user.name,
                                isAdmin: user.isAdmin,
                                isActive:user.isActive,
                                isSubscribed: isSubscribed
                            }
                            //console.log(sendUserData);
                            return res.status(200).send({status:true,message:"success", token:user.accessToken , user:sendUserData})

                        } else {
                            var sendUserData ={
                                email : user.email,
                                name : user.name,
                                isAdmin: user.isAdmin,
                                isActive:user.isActive,
                                isSubscribed: true
                            }
                            return res.status(200).send({status:true,message:"success", token:user.accessToken , user:sendUserData})
                        }
                        
                    } else {
                        console.log(err);
                        return res.status(400).send({status:false, err: err, message: 'Password Incorrect !'});
                    }
                });

        })
        .catch((err)=>{
            return res.status(400).send({status:false, message:'User not Exists!' });
        })
}

/**
 * function to get users list
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getAllUsers(req,res,next){

    var token = req.headers.authorization || req.headers.token;

    isUserAdmin(token).then((user)=>{
        Users.aggregate([
            {
                $match:{
                    isAdmin : false
                },
            },
            {
                $project:{
                    email : 1,
                    name : 1,
                    isActive:1
                }
            }
        ],function(err,data){
            if(!err){

                if(data.length === 0){
                    return res.status(200).send({ message:'No user found',data:[],status:true});
                } else {
                    return res.status(200).send({ message:'Users Fetched',data:data,status:true})
                }
                
            } else {
                return res.status(500).send({message:'Whoops something went wrong',status:false});
            }
        })
    })
    .catch(()=>{
        return res.status(200).send({ message:'Your not authorized',data:[],status:false});
    })
  
}

/**
 * function to update user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function updateUser(req,res,next){
    var token = req.headers.authorization || req.headers.token
    var body = req.body;
    var isActive = req.body.isActive;
    var user_id = req.params.id;

    isUserAdmin(token)
        .then(()=>{   
            var conditions = { _id:user_id }
            ,   update = { $set: { isActive : isActive}}
            ,   options = { multi: false };

            Users
                .update(conditions,update,options)
                .then((data)=>{

                    if(data.ok ==1 && data.n==1 && data.nModified==1){
                        return res.status(200).send({message:'Updated',status:true})
                    }

                }).catch(function(err){
                    console.log(err)
                    return res.status(400).send({message:'Something went wrong',status:false})
                })

        }).catch(function(err){
            return res.status(403).send({message:'Forbidden',status:false})
        }) 
}

/**
 * function to check token is for admin or not 
 * @param {string} token
 * @returns promise 
 */
function isUserAdmin(token){
    return new Promise(function(resolve,reject){
        Users.aggregate([
            {
                $match:{
                    $and:[
                        {
                            accessToken : token
                        },
                        {
                            isAdmin : true
                        }
                    ]
                }
            },
            {
                $project : {
                    email: 1,
                    name: 1
                }
            },
            { 
                $limit : 1 
            }
        ],function(err,admins){

            if(admins.length != 0){
                resolve(admins);
            } else {
                reject({message:'Not an admin'});
            }

        })
    })
}
/**
 * Function for user's forget password
 * @param {object} req
 * @param {object} res
 */
function userForgetPassword(req,res){
    var email = req.body.email;
    Users
        .findOne({email})
        .select({email:1})
        .then(user =>{
            var resetToken = jwt.sign({ email: user.email },"amagiczap.com" , { expiresIn: 60 * 60 });
            sendForgetPasswordMail(email,resetToken,function(err,info){
                if (!err){
                    res.status(200).send({message: 'An email has been sent to reset password', status: true});
                } else {
                    res.status(500).send({message: 'Something went wrong!', status: false});
                }
            })
        })
        .catch(err=>{
            res.status(500).send({message: 'Something went wrong!', status: false});
        })
}
/**
 * Function for users's reset password
 * @param {object} req 
 * @param {object} res
 */
function userResetPassword(req,res){
    var token = req.headers.authorization || req.params.token;
    var password = req.body.password;
    jwt.verify(token, 'amagiczap.com',function(err, decoded){
        if (!err){
            Users
                .findOne({email : decoded.email})
                .select({password: 1})
                .then(user => {
                    user.password = password ;
                     return user.save()
                })
                .then(docs=>{
                        return res.status(200).send({message:'Password updated',status:true})
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).send({message:'Something went wrong',status:false})
                })
        } else {
            res.status(400).send({message: 'Something went wrong', status: false})
        }        

    });
}
module.exports = {
    userRegister,
    userLogin,
    getAllUsers,
    updateUser,
    userForgetPassword,
    userResetPassword
}