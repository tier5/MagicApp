/**
 * Name: authController.js
 * Purpose : Authentication controller
 */
var Users = require('../models/users');
var bcrypt = require('bcrypt');
var moment = require('moment');
var {createCustomer , createSubscription, createCharge, deleteCustomer , retrieveCustomer, retriveSubscription} = require('../helpers/stripe');
var {sendForgetPasswordMail} = require('../helpers/nodemailer.js');
var {createAccessToken} = require('../helpers/jwt');
var jwt = require('jsonwebtoken');

/**
 * function to register a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function userRegister(req,res,next){
    var body = req.body;
    body.userType = 'paid'  // always have to pay to use the application
    body.stripe= {};
    body.stripe.plan = {
        id : 'plan_ELXlaXBXY1MRSS'
    };
    body.stripe.cards=[];
    // creating an object to store card details
    var card = {
        id : body.card.id,
        isDefault : true
    }
    body.stripe.cards.push(card);

    // create customer for the stripe 
    createCustomer(body.email,body.cardToken)
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
            body.accessToken = createAccessToken(body.email);
            var user = new Users(body)
            return user.save();
        }) // create a user 
        .then((user)=>{
            var sendUserData = {
                email : user.email,
                name : user.name,
                isAdmin: user.isAdmin,
                isActive:user.isActive,
                isSubscribed : true,
                userType:user.userType
            }
            return res.status(200).send({status:true,message:"User created", token:user.accessToken , user:sendUserData})
        })
        .catch((err)=>{
            console.log(err);

            // deleteCustomer(body.stripe.customer.id)
            //     .then(confirmed => console.log('deleted'))
            //     .catch(err=>console.log(err));

            return res.status(400).send({status:false, message: err.message});
        })
}

/**
 * function to login a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
async function userLogin(req,res,next){
    var { email, password } = req.body;
    try {
        var user = await Users.findOne({email}).select({ email:1,password:1,stripe:1,isActive:1,isAdmin:1,userType:1, accessToken: 1,userType:1, name:1});
        if(!user){return res.status(400).send({message:'User not exists',status: false})}
        var decoded = await bcrypt.compare(password, user.password);
        if (decoded) {
            var sendUserData = {
                email       :   user.email,
                name        :   user.name,
                isAdmin     :   user.isAdmin,
                isActive    :   user.isActive,
                userType    :   user.userType
            }
            if (user.userType == 'free') {

                sendUserData.isSubscribed = true ;

            } else {

                var subscribtion = await retriveSubscription(user.stripe.subscription.id);
                
                if (subscribtion.status == 'active'){

                    sendUserData.isSubscribed = true;

                } else {

                    sendUserData.isSubscribed = false;

                }
            }
            return res.status(200).send({status:true,message:"success", token:user.accessToken , user:sendUserData})
    
        } else {

            return res.status(400).send({status:false,message:"Either password or email is wrong!"})
        }
        
    } catch (error) {

        console.log(error);

        return res.status(500).send({status:false,message:error})
    }
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
        .then(user => {
            if(!user) { return res.status(500).send({message: 'Email not exists!', status: false}); } 
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
            console.log(err);
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
            console.log(err);
            res.status(400).send({message: 'Something went wrong', status: false})
        }        

    });
}
/**
 * Function to update user's password
 * @param {object} req 
 * @param {object} res
 */
function userUpdatePassword(req,res){
    var token = req.headers.authorization || req.params.token;
    var password = req.body.password;
    if (!password || !token){
        return res.status(400).send({message:'Bad Request',status:false});
    };
    Users
        .findOne({accessToken : token})
        .select({password: 1})
        .then(user => {
            if(!user){
                return res.status(400).send({message:'Bad Request',status:false});
            }
            user.password = password;
            return user.save()
        })
        .then(docs=>{
            return res.status(200).send({message:'Password updated',status:true});
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).send({message:'Something went wrong',status:false});
        })
}

async function getUserPrimaryData(req, res, next){
    var token = req.headers.authorization
    var user = await Users.findOne({accessToken : token}).select({ email:1, isActive:1,isAdmin:1,userType:1, accessToken: 1, name:1, isSubscribed: 1});
    if (!user){
        return res.status(404).send({message:'Not Found',status:false});
    }
    var sendUserData ={
        email       :   user.email,
        name        :   user.name,
        isAdmin     :   user.isAdmin,
        isActive    :   user.isActive,
        userType    :   user.userType
    }
    if (user.userType == 'free') {

        sendUserData.isSubscribed = true ;

    } else {

        var subscribtion = await retriveSubscription(user.stripe.subscription.id);
        
        if (subscribtion.status == 'active'){

            sendUserData.isSubscribed = true;

        } else {

            sendUserData.isSubscribed = false;

        }
    }
    return res.status(200).send({status:true,message:"success", token:user.accessToken , user:sendUserData})
}

async function checkEmailExists(req,res){
    let email = req.body.email;
    try {
        let isFound = await Users.findOne({email : email});
        if (isFound){
            return res.status(400).send({status : false, message: 'Email Exists', data:{ email : email}})
        } else {
            return res.status(200).send({status : true, message : 'Email does not exists', data: { email : email}})
        }
    } catch (error) {
            return res.status(500).send({status : false, message : 'Something Went Wrong'});
    }
}

module.exports = {
    userRegister,
    userLogin,
    userForgetPassword,
    userResetPassword,
    userUpdatePassword,
    getUserPrimaryData,
    checkEmailExists
}