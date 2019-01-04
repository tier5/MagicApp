/**
 * hooksController.js
 * @description It is a controller file for a webhook into the magic app
 */

const uuid = require('uuid/v4');
var {demoCardToken, createCustomer, createSubscription, deleteCustomer} = require('../helpers/stripe');
var Users = require('../models/users');
var Zaps = require('../models/zaps');
var _ = require('lodash');
var {createAccessToken} = require('../helpers/jwt');
 /**
  * Function to create a user from a hook
  */
 function createUserFromHook(req,res){
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    if(!token || token != testTokenNumber){
        return res.status(200).send({http_code : 200, status :false , message : 'Token mismatch!'})
    };
    if (!email){ return res.status(200).send({message : 'email is required!' , status : false})}
    Users.findOne({email:req.body.email}).then((user)=>{
        //console.log(user)
        if(user) {
            res.status(200).send({message: 'User Already exists!', status : false, http_code: 200 })
        } else {
            createUser(req,res);
        }
    }).catch(err => {
        res.status(200).send({message : 'Something Went Wrong!', http_code : 200, status :false})
    })
    
 };

 function createUser(req,res){
    var token = req.body.token ;
    let test  =  '1234511';
    var email = req.body.email;
    var newUser = {
        email: email,
        name :'test',
        password : '123456',
        userType:'paid',
        stripe: {
            customer: {},
            subscription :{}
        }
    };
    demoCardToken()
        .then(token => {
            //console.log(token);
            return createCustomer(email, token.id);
            //res.send(token);
        }).then(customer => {
            //console.log(customer);
            var planId = '565276330301511';
            newUser.stripe.customer.id = customer.id;
            return createSubscription(customer.id,planId);

        }).then(subscription => {
            //console.log(subscription);
            newUser.stripe.subscription.id = subscription.id;
            newUser.accessToken = createAccessToken(email);
            var user = new Users(newUser);
            return user.save()
        }).then(user => {
            //console.log(user);
            return res.status(200).send({http_code : 200, status :true , message : 'User Created'})
        }).catch(err => {
            //console.log(err);
            res.status(200).send({message : 'Something went wrong', status:false ,http_code:200, error : err})
        })
 };

 function deleteUserFromHook(req,res){
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({http_code : 200, status :false , message : 'Token mismatch!'})
    };
    // checking email
    if (!email){ return res.status(200).send({message : 'email is required!' , status : false})};
    
    Users.findOne({email:req.body.email}).then((user)=>{
        if(!user) {
            return res.status(200).send({message: 'User not exists!', status : false, http_code: 200 })
        } else {
            if (user.zaps.length) {
                user.zaps.forEach( zap => {
                    Zaps.remove({zapId : zap._id}).then(deleted=>{
                        console.log('deleted');
                    }).catch(error=>{
                        console.log('not deleted')
                    })
                })
            }
            let customerId = user.stripe.customer.id;
            if (user.userType == 'paid' && customerId){
                
                deleteCustomer(customerId).then(confirmation=> {
                    if (confirmation.deleted){
                        Users.remove({email : user.email}).then(docs => {
                            return res.status(200).send({http_code : 200, status :true , message : 'User deleted!'})
                        }) 
                    }
                }).catch(err => {
                    return res.status(200).send({message : 'Something Went Wrong!', http_code : 200, status :false})
                })
            } else {
                
                Users.remove({email : user.email}).then(docs => {
                    return res.status(200).send({http_code : 200, status :true , message : 'User deleted!'})
                })
            }
        }
    }).catch(err => {
    
        return res.status(200).send({message : 'Something Went Wrong!', http_code : 200, status :false})
    })
 }

 function suspendUserFromHook(req, res) {
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({http_code : 200, status :false , message : 'Token mismatch!'})
    };
    // checking email
    if (!email){ return res.status(200).send({message : 'email is required!' , status : false})};
    
    Users.findOneAndUpdate({
        email : email
    },
    {
        $set :{
            email : email + "_suspend"
        }
    }).then(updated =>{
        if (!updated) { return res.status(200).send({status : false , message : 'Account not found!'})}
        return res.status(200).send({ status :true , message : 'Account suspended'});
    }).catch(error=>{
        return res.status(200).send({message : 'Server Internal Error!', status:false});
    })
 }

 function unsuspendUserFromHook (req, res) {
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({status :false , message : 'Token mismatch!'})
    };
    // checking email
    if (!email){ return res.status(200).send({message : 'email is required!' , status : false})};
    let ckeckSuspendedEmail = email + '_suspend';
    Users.findOneAndUpdate({
        email : ckeckSuspendedEmail
    },
    {
        $set :{
            email : email
        }
    }).then(updated =>{
        if (!updated) { return res.status(200).send({ status : false , message : 'Account not found!'})}
        return res.status(200).send({status : true , message : 'Account unsuspended'});
    }).catch(error=>{
        return res.status(200).send({message : 'Server Internal Error!', status:false});
    })
 }

  module.exports = {
    createUserFromHook,
    deleteUserFromHook,
    suspendUserFromHook,
    unsuspendUserFromHook
  }