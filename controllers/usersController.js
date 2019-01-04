/**
 * Name: usersController.js
 * Purpose :  a users controller
 */
const Users = require('../models/users');
const _ = require('lodash');
const {createAccessToken} = require('../helpers/jwt');
 
 /**
  * Function to create a user 
  * @param {object} req 
  * @param {object} res 
  */
 function createUser(req,res){ 
    var body = req.body;
    body.userType = 'free' ;// free user is created by admin and can access the system without any payment
    body.accessToken = createAccessToken(body.email);
    var user = new Users(body);
    user.save()
        .then(docs=>{
            var data = _.pick(docs, ['_id', 'userType','isActive','email', 'name']);
            res.status(200).send({status: true, message: 'users created', data :data });
        })
        .catch(err=>{
            
            for (var prop in err.errors){
                var errorMessage = err.errors[prop].message;
                break ;
            }
            if (err.code== 11000){
                errorMessage = 'Email already taken'
            }
            var message = errorMessage ? errorMessage : 'Something Went Wrong!';
            res.status(400).send({message : message, status:false});
        });

 };

 /**
 * function to get users list
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getAllUsers(req,res,next){

    var token = req.headers.authorization || req.headers.token;
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
        },
        {
            $sort:{
                _id : -1
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
};

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
}

function getUserFromToken(token){
    return new Promise((resolve, reject)=>{
        Users.findOne({ accessToken : token}).then(data=>{
            if (data){
                return resolve(data);        
            } else {
                return reject('Not Found!');
            }
    
        })
    }) 
}

 module.exports ={
    createUser,
    getAllUsers,
    updateUser,
    getUserFromToken
 }