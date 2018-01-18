var ZapData = require('../models/zaps');
var {findZap} = require('./zapController');
var validation = require('../helpers/validations');
function saveScriptData(req,res,next){
    var body = req.body;
    var location = req.body.location;
    var script_params = req.body.params;
    console.log('sajhdjasdasd');
    res.status(200).send({message:'Success',status:true});
    findZap(body.zapId).then((zap)=>{
        var zap_params = zap.params;
        var body = req.body
        validation.isAllParamsExists(zap_params,script_params).then(()=>{
          validation.isAllValidationPassed(zap_params,script_params).then(()=>{
            // after validation save the data to zaps model
                zapData = new ZapData()
                zapData.zapId = body.zapId
                zapData.location= body.location
                for (prop in script_params){
                    zapData.params.push({
                        field_name : prop,
                        field_value : script_params[prop]
                    })
                }

                zapData.save().then(function(data){
                    console.log('script data saved');
                }).catch(function(err){
                    console.log(err);
                })
    
          }).catch((err)=>{
            console.log(err);
            console.log('Params Validation Failed!')
          })
        }).catch((err)=>{
          console.log('Params does not exists');
        })
      }).catch((err)=>{
        console.log(err);
      })
}

module.exports = {
    saveScriptData
}