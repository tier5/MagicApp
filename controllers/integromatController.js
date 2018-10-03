/**
 * Name: integromatController.js
 * Purpose : integromat Controller controls all the integromat operation
 */
var Users = require('../models/users');
var ZapData = require('../models/zaps');
var _ = require('lodash');
var axios = require('axios');

/**
 * function to Authenticate User
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function usersAuthenticate(req,res,next){
    console.log('LOGIN',req.headers);
    console.log('LOGIN',req.body);
    console.log('LOGIN',req.params);
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
            res.status(200).send({message:'User Authenticated',status:true});
          }
    })
}
/**
 * function to send all zaps created
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function usersIntegromat(req,res,next){
    console.log('LOGIN',req.headers);
    console.log('LOGIN',req.body);
    console.log('LOGIN',req.params);
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
 * function to send zap script
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getScripts(req,res,next){
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

module.exports ={
    usersIntegromat,
    usersAuthenticate,
    getScripts
}