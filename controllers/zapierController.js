/**
 * Name: zapierController.js
 * Purpose : Zapier Controller controls all the zapier operation
 */
var Users = require('../models/users');
var ZapData = require('../models/zaps');
var _ = require('lodash');

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
              if(data.lenght==0){
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
    var zapId = req.params.zapId
    // fetching all data from database for the scriptid
    ZapData.find({zapId:zapId}).then((data)=>{
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
    usersZaps,
    getScriptZaps
}