/**
 * Name: usersController.js
 * Purpose :  a users controller
 */
const Users                     = require('../models/users');
const _                         = require('lodash');
const {createAccessToken}       = require('../helpers/jwt');
const ScriptData                = require('../models/zaps');
const WareHouse                 = require('../models/warehouse');
const {deleteCustomer}          = require('../helpers/stripe');
const Plans                     = require('../config/plans.config');
const UserSubscriptionHistory   = require('../models/userSubscriptionHistory');
 
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

/**
 * Function to get User record from token
 * @param {string} token 
 */
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

/**
 * Function user data warehousing
 * @param {string} email 
 */
async function userWarehousing(email){
    
    return new Promise(async (resolve, reject)=>{
        try {
            let newWarehouse  = {
                email : email,
                usersCollectionData: {},
                scriptData: []
            }
            
            let UserData = await Users.findOne({ email : email });

            if (!UserData){
                return reject({ status : false, error : 'User Not Found!'})
            }
    
            if (UserData){
                newWarehouse.usersCollectionData = UserData;
            }
    
            let ZapIDs = UserData.zaps.map(zap =>{
                return zap._id
            });
    
            let AllZapsData = [];
    
            if (ZapIDs.length){
    
                AllZapsData = await ScriptData.find({ zapId : { $in : ZapIDs}});
            }
    
            if(AllZapsData.length){
                newWarehouse.scriptData = AllZapsData;
            }
    
            let newWH = WareHouse.create(newWarehouse);
            
            return resolve({ status : true, message : 'User back up done'});
            
            
        } catch (error) {

            return reject({ status : false, error : error.message})
            
        }
    })
    
}
/**
 * Function to delete user from the database
 * @param {string} email 
 */
async function removeUser(email){
    return new Promise(async (resolve, reject) => {

       try {
            let user = await Users.findOne({email: email});

            if (!user){
                return reject({ status : false, error :'User not found!'});
            }
    
            let usersZapsIds = user.zaps.map(o => o._id);
    
            let removeZapsData = await ScriptData.remove({ zapId : { $in : usersZapsIds}});
            let removeTheUser = await Users.remove({ email : email });
            let removeHistory = await UserSubscriptionHistory.remove({ email : email})
            return resolve({status: true, message : 'Deleted'});
       } catch (error) {
            return reject({ status : false, error : error.message})
       }
       
    })
}

/**
 * Function to update profile 
 * 
 */
async function updateProfile(req, res){
    let token = req.headers.authorization;
    let {name} = req.body

    try {
        let thisUser = await Users.findOne({accessToken : token}).select({ name : 1});
        if (!thisUser){
            return res.status(400).send({ message: 'Bad Request', status: false})
        }
        let conditions = { accessToken: token }
        ,   update = { $set: { name : name}}
        ,   options = { multi: false };

        let updatedUser = await Users.updateOne(conditions, update, options);
        return res.status(200).send({message : 'Updated', status: true, data: req.body});

    } catch (error) {
        return res.status(500).send({message: 'Server Internal Error', status: false, error: error.message})
    }
    
}
/**
 * Function to cancel application membership
 * @param {object} req 
 * @param {object} res 
 */
async function cancelMembership(req, res){
    try {
        let thisUser = await Users.findOne({ accessToken : req.headers.authorization}).select({ stripe: 1 , email: 1 , name: 1});
        if(!thisUser){
            return res.status(400).send({message: 'Bad request', status: false});
        }
        let customerId = thisUser.stripe.customer ? thisUser.stripe.customer.id : null;
        if (!customerId){
            return res.status(400).send({message: 'Bad request', status: false});
        }
        let deleteCustomerFromStripe = await deleteCustomer(customerId);
        let deleteUserFromDB = await removeUser(thisUser.email);
        return res.status(200).send({message: 'Deleted', status: true , data: { name : thisUser.name}});

    } catch (error) {
        return res.status(400).send({message: error.message, status: false});
    }
}

/**
 * Function to get user's current subscription
 * @param {object} req 
 * @param {object} res 
 */
async function getUserCurrentSubscription(req, res){
    try {
        let token = req.headers.authorization;
        let thisUser = await Users.findOne({ accessToken : token }).select({email: 1, stripe: 1, isSubscribed: 1, isHookedUser:1, subscriptionStatus: 1});
        if(!thisUser){
            return res.status(400).send({message: 'Not Found', status: false, data: {}});
        }
        let data = {
            isSubscribed: thisUser.isSubscribed,
            currentPlan: thisUser.stripe.plan.id,
            isHookedUser: thisUser.isHookedUser,
            subscriptionStatus: thisUser.subscriptionStatus
        }
        let findCurrentPlan = Plans.filter(plan=>{
            if (plan.stripePlanId === data.currentPlan){
                return plan;
            }
        });
        if(findCurrentPlan.length){
            data.currentPlanName = findCurrentPlan[0].planName;
        }
        return res.status(200).send({message: 'Ok', status: true, data : data});
    } catch (error) {
        return res.status(500).send({message: error.message, status: false , error: error.message});
    }

}


 module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    getUserFromToken,
    userWarehousing,
    removeUser,
    updateProfile,
    cancelMembership,
    getUserCurrentSubscription,
 }