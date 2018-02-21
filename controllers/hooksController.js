/**
 * hooksController.js
 * @description It is a controller file for a webhook into the magic app
 */

const uuid = require('uuid/v4');
var {demoCardToken, createCustomer, createSubscription, deleteCustomer} = require('../helpers/stripe');
var Users = require('../models/users');
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
        return res.status(400).send({http_code : 400, status :'error' , message : 'Token mismatch!'})
    };
    if (!email){ return res.status(400).send({message : 'email is required!' , status : false})}
    Users.findOne({email:req.body.email}).then((user)=>{
        //console.log(user)
        if(user) {
            res.status(400).send({message: 'User Already exists!', status : 'error', http_code: 400 })
        } else {
            createUser(req,res);
        }
    }).catch(err => {
        res.status(500).send({message : 'Something Went Wrong!', http_code : 500, status :'error'})
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
            return res.status(201).send({http_code : 201, status :'success' , message : 'User Created'})
        }).catch(err => {
            console.log(err);
            res.status(400).send({message : 'Something went wrong', status:'error' ,http_code:400, error : err})
        })
 };

 function deleteUserFromHook(req,res){
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(400).send({http_code : 400, status :'error' , message : 'Token mismatch!'})
    };
    // checking email
    if (!email){ return res.status(400).send({message : 'email is required!' , status : false})};
    
    Users.findOne({email:req.body.email}).then((user)=>{
        if(!user) {
            return res.status(400).send({message: 'User not exists!', status : 'error', http_code: 400 })
        } else {
            let customerId = user.stripe.customer.id;
            if (customerId){
                
                deleteCustomer(customerId).then(confirmation=> {
                    if (confirmation.deleted){
                        Users.remove({email : user.email}).then(docs => {
                            return res.status(200).send({http_code : 200, status :'success' , message : 'User deleted!'})
                        }) 
                    }
                }).catch(err => {
                    return res.status(500).send({message : 'Something Went Wrong!', http_code : 500, status :'error'})
                })
            } else {
                    return res.status(500).send({message : 'Something Went Wrong!', http_code : 500, status :'error'})
            }
        }
    }).catch(err => {
        return res.status(500).send({message : 'Something Went Wrong!', http_code : 500, status :'error'})
    })
 }

  module.exports = {
    createUserFromHook,
    deleteUserFromHook
  }