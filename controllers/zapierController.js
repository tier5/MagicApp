/**
 * Name: zapierController.js
 * Purpose : Zapier Controller controls all the zapier operation
 */
var Users = require('../models/users');
var ZapData = require('../models/zaps');
var _ = require('lodash');
var axios = require('axios');

/**
 * function to send all zaps created
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function usersZaps(req,res,next){
    Users.aggregate([
        {
            $match:{
                "accessToken" : req.params.api_key 
            }
        }
      ],function(err,data){
          if(err) {
              res.status(401).send({message:'Unauthorized',status:false})
          } else {
              if(!data.length) {
                  return res.status(401).send({message:'Unauthorized',status:false})
              } else {
                var zaps = data[0].zaps
                var resObj = []
                _.forEach(zaps, function(value) {
                    var filterZap = {
                    id : value._id,
                    name: value.name
                    }
                    resObj.push(filterZap);
                });
        
                res.status(200).send(resObj);
            }

          }
    })
}
/**
 * function to get all the script data stored in script_data model and send to zapier
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getScriptZaps(req,res,next){
    var zapId = req.params.zapId;
    // fetching all data from database for the scriptid
    ZapData.find({zapId:zapId}).sort({"createdAt": -1}).then((data)=>{
      if (data.length==0){
        res.status(200).send({response: [], message: 'Success',status:true});
      } else {
        var resArr = []
        // changing nested document to linear data 
        try {
          data.forEach(function(obj){
            var eachObj = {}
            eachObj.location = obj.location;

            obj.params.forEach(ob => {
              eachObj[ob.field_name] = ob.field_value
            });
            
            eachObj.id = obj._id;
            resArr.push(eachObj);
          });

          return res.status(200).send({response: resArr, message: 'Success',status:true});
        } catch (error) {
          console.log(error);
        }
      }
        
    }).catch((err)=>{
      console.log(err);
      return res.status(400).send({message: 'Something went wrong!',status:false,response:[]});
    })
}

/**
 * Function used for getting zapier hooks url through subscriptions and adding in zaps for future post data
 * @param {object} req 
 * @param {object} res 
 */
function subscribtionZaps(req,res){
    var zapId = req.params.zapId;

    var api_key = req.params.api_key;
    var target_url = req.body.target_url;
    if (!api_key && !target_url){
        return res.status(200).json({message : 'api_key is required'})
    }
    // save the hooks url coming from zapier for future post request
    Users.findOne({accessToken : api_key}).then(user => {
        if (!user) return res.status(200).json({ message : 'Invalid token', status : false })
        user.target_url = target_url
        user.zaps.forEach(zap => {
            if (zap._id == zapId){
                
                zap.hooks_url = target_url
            }
        })
        return user.save()
    }).then(user=> {
        return ZapData.find({zapId:zapId}).sort({"createdAt": -1})
    }).then(data=> {
        if (data.length==0){
            return sendDataToZapier(target_url, {})
          } else {
            var resArr = []
            // changing nested data structure to linear data structure 
            data.forEach(function(obj){
                var eachObj = {}
                eachObj.location = obj.location;
    
                obj.params.forEach(ob => {
                  eachObj[ob.field_name] = ob.field_value
                });
                
                eachObj.id = obj._id;
                resArr.push(eachObj);
              });
            return sendDataToZapier(target_url, resArr[0])
        }
    }).then(dataFromZapier => {
        res.status(200).send({message: 'ok'});
    }).catch(err=>{
        res.status(200).send({message: 'not ok', error : err.message});
    })
}

/** 
 * Function to send data to zapier through a zapier hook links 
 * @param hook_url String
 * @param data object that needs to be sent 
 * @returns promise 
*/
function sendDataToZapier(hooksUrl, dataToBeSend){
    
        return axios.post(hooksUrl, dataToBeSend) 
}
module.exports ={
    usersZaps,
    getScriptZaps,
    subscribtionZaps,
    sendDataToZapier
}