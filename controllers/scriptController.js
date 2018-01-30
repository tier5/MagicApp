var ZapData = require('../models/zaps');
var {findZap} = require('./zapController');
var validation = require('../helpers/validations');
function saveScriptData(req,res,next){
    var body = req.body;
    var location = req.body.location;
    var scriptParams = req.body.params;
    var zapParams;
    var userZap;
    findZap(body.zapId)
        .then((zap)=>{
            userZap = zap;
            zapParams = zap.params;
            return validation.isAllParamsExists(zapParams,scriptParams);
        }).then(()=>{
            return validation.isAllValidationPassed(zapParams,scriptParams);
        }).then(()=>{
            zapData = new ZapData()
            zapData.zapId = body.zapId
            zapData.location= body.location
            for (prop in scriptParams){
                zapData.params.push({
                    field_name : prop,
                    field_value : scriptParams[prop]
                })
            }
            return zapData.save()
        }).then((data)=>{
            console.log(userZap);
            var resData = {
                message:'Success',
                status:true,
                appendUrls: userZap.magicOption
            }
            res.status(200).send(resData);
        }).catch((err)=>{
            console.log(err);
            res.status(400).send({message:'Something went wrong!',err:err,status:false})
        });
}

module.exports = {
    saveScriptData
}