/**
 * Name: scriptController.js
 * Purpose : Script Controller controls everything from script
 */
var ZapData = require('../models/zaps');
var {findZap, updateCounter} = require('./zapController');
var validation = require('../helpers/validations');
var {sendDataToZapier} = require('./zapierController');

/**
 * Function to save script data 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
function saveScriptData(req,res,next){
    var body = req.body;
    var location = req.body.location;
    var scriptParams = req.body.params;
    var zapParams;
    var userZap;
    var token = '';
    findZap(body.zapId)
        .then((data)=> {
            var zap = data.zap;
            token = data.accessToken;
            userZap = zap;
            zapParams = zap.params;
            // update the page view counter
            updateCounter(token, zap._id, 'pageViewCounter');
            return validation.isAllParamsExists(zapParams,scriptParams);
        })
        .then(()=>{
            return validation.isAllValidationPassed(zapParams,scriptParams);
        })
        .then(()=> {
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
        })
        .then((data)=> {
            
            var resData = {
                message:'Success',
                status:true,
                appendUrls: userZap.magicOption
            }
            // this steps are for Zapier REST hooks
            var dataForZapier = {}
                dataForZapier.location = data.location;
    
                data.params.forEach(ob => {
                    dataForZapier[ob.field_name] = ob.field_value
                });
                
                dataForZapier.id = data._id;
                // send data to zapier if hook url is present
                if (userZap.hooks_url){
                    sendDataToZapier(userZap.hooks_url, dataForZapier).then(done=>{
                        console.log('ok');
                        updateCounter(token, userZap._id, 'zapierTriggerCount');
                    }).catch(error=>{
                        console.log('error');
                    })
                }
                
            
            return res.status(200).send(resData);
        })
        .catch((err)=>{
            console.log(err);
            return res.status(400).send({message:'Something went wrong!',err:err,status:false})
        });
}

/**
 * Function to get zaps element attribute  
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
function getElementAttribute(req,res){
    let zap_id = req.params.id;
    findZap(zap_id)
        .then(data=> {
            let zap = data.zap;
            res.status(200).send({
                message : 'Ok',
                status : true,
                attributes: zap.element_attributes ? zap.element_attributes : [],
                cookieOption: zap.cookieOption? zap.cookieOption : false,
                timeoutOption: zap.timeoutOption ? zap.timeoutOption : false,
                magicOption : zap.magicOption ? zap.magicOption : false,
                elementOption: zap.elementOption ? zap.elementOption : false,
                timeout : zap.timeout ? zap.timeout : {},
            });

            
        }).catch(error => {res.status(404).send({message : 'Not Allowed', status : false})})
}
module.exports = {
    saveScriptData,
    getElementAttribute
}