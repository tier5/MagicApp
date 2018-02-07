/**
 * Name: authController.js
 * Purpose : Authentication controller
 */
var Users = require('../models/users');
var bcrypt = require('bcrypt');
var {createCustomer , createSubscription, createCharge, deleteCustomer , retrieveCustomer} = require('../helpers/stripe');

/**
 * function to register a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function userRegister(req,res,next){
  var body = req.body;
  body.planId = body.plan.id;
  var userType = body.userType; // 'paid' or 'free'
  createCustomer(body,userType)
        .then((customer)=>{
            body.customerId = customer.id;
            return createSubscription(body.customerId,body.planId)
        })
        .then((subscription)=>{
            body.subscriptionId = subscription.id;
            var user = new Users(body)
            return user.save();
        })
        .then((user)=>{
            var sendUserData = {
                email : user.email,
                name : user.name,
                isAdmin: user.isAdmin,
                isActive:user.isActive
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
        .then(user=>{
            bcrypt
                .compare(password, user.password, (err, data) => {
                    if (data) {
                        var sendUserData ={
                            email : user.email,
                            name : user.name,
                            isAdmin: user.isAdmin,
                            isActive:user.isActive,
                        }
                        return res.status(200).send({status:true,message:"success", token:user.accessToken , user:sendUserData})
                        
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
module.exports = {
    userRegister,
    userLogin,
    getAllUsers,
    updateUser
}