/**
 * Name: usersController.js
 * Purpose :  a users controller
 */
const Users = require('../models/users');
const _ = require('lodash');
const {createAccessToken} = require('../helpers/jwt')
 
 function createUser(req,res){
    var body = req.body;
    body.userType = 'free' // free user is created by admin and can access the system without any payment
    body.accessToken = createAccessToken(body.email);
    var user = new Users(body);
    user.save()
        .then(docs=>{
            var data = _.pick(docs, ['_id', 'userType','isActive','email', 'name']);
            res.status(200).send({status: true, message: 'users created', data :data });
        })
        .catch(err=>{
            console.log(err);
            for (var prop in err.errors){
                var errorMessage = err.errors[prop].message;
                break ;
            }
            if (err.code== 11000){
                errorMessage = 'Email already taken'
            }
            var message = errorMessage ? errorMessage : 'Something Went Wrong!';
            res.status(400).send({message : message, status:false});
        })

 }
 module.exports ={
    createUser
 }