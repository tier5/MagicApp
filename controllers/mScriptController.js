/**
 * Name: mScriptController.js
 * Purpose : Magic Script Controller controls all the Magic script operation
 */

var Users = require('../models/users');
var _ = require('lodash');
var mongoose = require('mongoose');

/**
 * function to get all scripts
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getMscripts(req,res,next){

    var token = req.headers.token || req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .then(user => {
            var magicScripts = user.magicscripts;
            return res.status(200).send({magicScripts:magicScripts , status:true,message:'fetched all magic scripts'});
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
function createScript(req,res,next){

    var body = req.body;
    var token = req.headers.token || req.headers.authorization;
    console.log(token);
    Users
        .findOne({accessToken : token})
        .then((data)=>{
            console.log(data);
            data.magicscripts.push(body);
            data.save()
                .then((dt)=>{
                    var magicscripts = dt.magicscripts
                    var ms = magicscripts.find((el)=>{
                        return el.domain_name == body.domain_name
                    })
                    return res.status(200).send({message:'Magic Script created !',ms:ms,status:true});
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
function deleteMscript (req,res,next){
    
    var script_id = req.params.id;
    var token = req.headers.token||req.headers.authorization;

    var conditions = { accessToken : token , "magicscripts._id": script_id}
    ,   update = {$pull : { magicscripts : {_id : script_id}}}
    ,   options = {} ;

    Users
        .update(conditions,update,options)
        .then(result=>{
            if (result.n==1){
                return res.status(200).send({message: 'Script Deleted', status :true})
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
function findMscript (scriptId){
    return new Promise(function(resolve,reject){
        var id = mongoose.Types.ObjectId(scriptId);
        Users.aggregate([
            {
                $match:{
                    "magicscripts._id":id
                }
            },
            {
                $project:{
                _id: 0,
                magicscripts: 1,
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
                    var magicscripts = data[0].magicscripts;
                    var magicscript = _.find(magicscripts, function(o) { return o._id == scriptId; });
                    resolve(magicscript);
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
function updateMscript (req,res,next){
    var scriptId = req.params.id
    ,   token = req.headers.authorization
    ,   id = mongoose.Types.ObjectId(scriptId)
    ,   magicOption = req.body.magicOption;

    var conditions = { accessToken: token, 'magicscripts._id' : scriptId }
    ,   update = { $set: { 'magicscripts.$': req.body }}
    ,   options = { multi: false , upsert : true};

    Users.updateOne(conditions, update, options).then((data)=>{
        return res.status(200).send({ message:'Updated', status:true });
    }).catch((err)=>{
        console.log(err);
        return res.status(200).send({ message:'Update unsuccessful', status:false });
    });
}

module.exports = {
    getMscripts,
    createScript,
    deleteMscript,
    findMscript,
    updateMscript
}