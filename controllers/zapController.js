/**
 * Name: zapController.js
 * Purpose : Zap Controller controls all the zap operation
 */

var Users = require('../models/users');
var _ = require('lodash');
var mongoose = require('mongoose');

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
function createZap(req,res,next){

    var body = req.body;
    var token = req.headers.token || req.headers.authorization;

    Users
        .findOne({accessToken : token})
        .then((data)=>{
            data.zaps.push(body);
            data.save()
                .then((dt)=>{
                    var zaps = dt.zaps
                    var zap = zaps.find((el)=>{
                        return el.name == body.name
                    })
                    return res.status(200).send({message:'Zap created !',zap:zap,status:true});
                })
                .catch(err=>{
                    console.log(err);
                    return res.status(400).send({message:'Something went wrong',status:false});
                })
        })
        .catch((err)=>{
            console.log(err);
            return res.status(403).send({message: 'Unautherized',status:false});
        })
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
    return new Promise(function(resolve,reject){
        var id = mongoose.Types.ObjectId(zapId);
        Users.aggregate([
            {
                $match:{
                    "zaps._id":id
                }
            },
            {
                $project:{
                _id: 0,
                zaps: 1,
                isActive:1
                }
            },
            { $limit : 1 }
        ],function(err,data){
            if(err) {
                console.log(err);
                reject(err)
            } else {
                if(data.length && data[0].isActive){
                    var zaps = data[0].zaps;
                    var zap = _.find(zaps, function(o) { return o._id == zapId; });
                    resolve(zap);
                } else {
                    reject({ message:'Either data not found or users script is not active'});
                }
            }
        })
    })
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
    ,   update = { $set: { 'zaps.$.magicOption': magicOption }}
    ,   options = { multi: false };

    Users.updateOne(conditions, update, options).then((data)=>{
        return res.status(200).send({ message:'Updated', status:true });
    }).catch((err)=>{
        console.log(err);
        return res.status(200).send({ message:'Update unsuccessful', status:false });
    });
}

module.exports = {
    getZaps,
    createZap,
    deleteZap,
    findZap,
    updateZap
}