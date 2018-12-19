/**
 * Name: zapController.js
 * Purpose : Zap Controller controls all the zap operation
 */

var Users                       = require('../models/users');
var _                           = require('lodash');
var mongoose                    = require('mongoose');
var {sendRefreshStats}          = require('../helpers/socket');
var {getUserFromToken }         = require('./usersController');
const Plans                     = require('../config/plans.config');
const {emitTotalDataStatistics} = require('../helpers/socket');
const UserHistory               = require('../models/userSubscriptionHistory');


/**
 * function to get all zaps
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getZaps(req,res,next){

    var token = req.headers.token || req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .then(user => {
            var zaps = user.zaps;
            return res.status(200).send({zaps:zaps , status:true,message:'fetched all zap'});
        })
        .catch(err => {
            return res.status(403).send({ message:'Whoops Something Went Wrong!',status:false })
        })
}

/**
 * function to create a zap
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
async function createZap(req,res,next){

    try {
        let {body} = req,
            token = req.headers.authorization;

        let isallowed = await checkZapCreationValidation(token);
        let thisUser  = await Users.findOne({accessToken: token}).select({zaps: 1, email: 1});

        thisUser.zaps.push(body);
        let data = await thisUser.save()
        let zaps = data.zaps
        let zap = zaps[isallowed]
        sendRefreshStats(thisUser);
        emitTotalDataStatistics();
        return res.status(200).send({message:'Zap created !',zap:zap,status:true});



    } catch (error) {
        return res.status(400).send({message: error.message, status: false});
    }
}

/**
 * function to delete a zap
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function deleteZap (req,res,next){
    
    var zap_id = req.params.id;
    var token = req.headers.token||req.headers.authorization;

    var conditions = { accessToken : token , "zaps._id": zap_id}
    ,   update = {$pull : { zaps : {_id : zap_id}}}
    ,   options = {} ;

    Users
        .update(conditions,update,options)
        .then(result=>{
            if (result.n==1){
                getUserFromToken(token).then(data => {
                    sendRefreshStats(data);
                })
                emitTotalDataStatistics()
                return res.status(200).send({message: 'Zap Deleted', status :true})
            }
        })
        .catch(err=>{
            console.log(err);
            return res.status(400).send({message: 'Something went wrong',status :false})
        })
}

/**
 * function to find a zap
 * @param {string} zapId
 * @returns promise 
 */
function findZap (zapId){
    return new Promise(function(resolve,reject) {
        var id = mongoose.Types.ObjectId(zapId);
        Users.aggregate(
            {
                $match:{
                    "zaps._id":id
                }
            },
            {
                $project:{
                    _id:                    0,
                    zaps:                   1,
                    isActive:               1,
                    accessToken:            1,
                    isHookedUser:           1,
                    currentSubscriptionId:  1,
                    isSubscribed: 1
                }
            },
            { 
                $unwind : "$zaps" 
            },
            {   $match : {
                    "zaps._id" : id
                }
            }).then(docs => {
                    //console.log(docs);
                if (docs.length && docs[0].isActive && docs[0].isSubscribed){
                    let accessToken = docs[0].accessToken;
                    let zap = docs[0].zaps;
                    resolve({ zap:zap, accessToken: accessToken , currentSubscriptionId : docs[0].currentSubscriptionId , isHookedUser: docs[0].isHookedUser});
                } else {
                    reject({ message:'Forbidden', status : false});
                }
            }).catch(err=> {
                //console.log(err);
                reject({message: 'Something Went Wrong!', status : false});
            });
    });

}

/**
 * function to update a zap in users collection
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function updateZap(req,res,next){
    var zapId = req.params.id
    ,   token = req.headers.authorization
    ,   id = mongoose.Types.ObjectId(zapId)
    ,   magicOption = req.body.magicOption;

    var conditions = { accessToken: token, 'zaps._id' : zapId }
    ,   update = { $set: { 'zaps.$': req.body }}
    ,   options = { multi: false , upsert : true};

    Users.updateOne(conditions, update, options).then((data)=>{
        return res.status(200).send({ message:'Updated', status:true });
    }).catch((err)=>{
        console.log(err);
        return res.status(200).send({ message:'Update unsuccessful', status:false });
    });
}

/**
 * Function to update counter in the zap i.e. pageViewCounter and zapierTriggerCounter
 * @param {string} userToken
 * @param {string} zapId
 * @param {string} counterName i.e.
 *      
 */
function updateCounter(userToken,zapId,counterName){
    var zapId = zapId
    ,   token = userToken
    ,   id = mongoose.Types.ObjectId(zapId);

    var conditions = { accessToken: token, 'zaps._id' : zapId }
    ,   options = { multi: false , upsert : false};

    if(counterName === 'pageViewCounter'){

        var update = {
            $inc: { "zaps.$.pageViewCount": 1 } 
        }

    } else if (counterName === 'zapierTriggerCount'){

        var update = {
            $inc: { "zaps.$.zapierTriggerCount": 1 } 
        }
    } else {

        var update = {

        }
    }
    Users.update(conditions, update, options).then(updated => {
        emitTotalDataStatistics()
        getUserFromToken(userToken).then(data => {
            
            sendRefreshStats(data);
        })
        
    });
}

function getUserZapsStats(req, res, next){
    let token = req.headers.authorization || req.body.token || req.headers.token;
    Users.aggregate({
        $match : {
            accessToken : token,
        }
    },{
        $project : { zaps : 1 , totalZaps : {$size : "$zaps"}}
    },{
        $unwind : '$zaps'
    },{
        $group : {
            _id: { totalZaps : "$totalZaps"},
            
            totalPageViews : {$sum : "$zaps.pageViewCount"},
            totalZapsTriggered: {$sum : "$zaps.zapierTriggerCount"},
        }
    },{
        $project : {
            totalZaps : "$_id.totalZaps",
            totalPageViews: 1,
            totalZapsTriggered: 1,
            _id : 0
        }
    }).then(data => {
        if (!data.length){
            return res.status(200).send({ message: 'ok', status : true, data: {totalZaps : 0, totalPageViews: 0, totalZapsTriggered: 0}})
        }

        return res.status(200).send({message : 'ok', status: true, data : data[0]})
    }).catch(error=>{
        return res.status(500).send({message : 'Server Internal Error', status: false, data : {}, error: error.message})
    })
}

/**
 * Function to check a user can create more zaps based on plans the user is having
 * @param {string} accessToken 
 */
async function checkZapCreationValidation(accessToken){
    
    return new Promise(async (resolve, reject)=>{

        try {
            let thisUser = await Users.findOne({accessToken: accessToken}).select({zaps: 1, stripe: 1, email: 1, isHooked: 1, isSubscribed: 1});
    
            if (thisUser.isHooked){
                resolve(zapLength)
            }
            let {userType, stripe, zaps} = thisUser;
    
            let zapLength = zaps.length;
            let planId = stripe.plan.id;
            let findPlan = Plans.filter( plan => plan.stripePlanId === planId);
            if (!findPlan.length){
                reject({message: 'Your plan is unknown to us contact admin'});
            }
            let planName = findPlan[0].planName;
            switch(planName){
                case 'STARTER': 
                    zapLength < 10 ? resolve(zapLength): reject({message : 'You already have maximum number of zaps'});
                case 'STANDARD':
                    zapLength < 50 ? resolve(zapLength): reject({message : 'You already have maximum number of zaps'});
                case 'PROFESSIONAL':
                    resolve(zapLength)
            }
                
        } catch (error) {
            reject({message : error.message});
        }

    })
}
/**
 * Function to 
 * @param {string} accessToken 
 */
async function resetZapsOptionsValue(accessToken){
    try {
        let user = await Users.findOne({accessToken : accessToken});
        let currentSubscriptionId = user.currentSubscriptionId;
        let history = await UserHistory.findById(currentSubscriptionId);
        let currentPlan = history.planName;
        if (currentPlan === 'STARTER'){
            user.zaps.map(element => {
                element.magicOption = false
                element.cookieOption = false
                element.timeoutOption = false
                return element
            });
            let updUser = await user.save();
        }

        if (currentPlan === 'STANDARD'){
            user.zaps.map(element => {
                element.cookieOption = false
                element.timeoutOption = false
                return element
            });
            let updUser = await user.save();
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getZaps,
    createZap,
    deleteZap,
    findZap,
    updateZap,
    updateCounter,
    getUserZapsStats,
    checkZapCreationValidation,
    resetZapsOptionsValue
}