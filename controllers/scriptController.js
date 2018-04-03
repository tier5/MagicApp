/**
 * Name: scriptController.js
 * Purpose : Script Controller controls everything from script
 */
var ZapData = require('../models/zaps');
var {findZap} = require('./zapController');
var validation = require('../helpers/validations');

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
    findZap(body.zapId)
        .then((zap)=>{
            userZap = zap;
            zapParams = zap.params;
            return validation.isAllParamsExists(zapParams,scriptParams);
        })
        .then(()=>{
            return validation.isAllValidationPassed(zapParams,scriptParams);
        })
        .then(()=>{
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
        .then((data)=>{
            var resData = {
                message:'Success',
                status:true,
                appendUrls: userZap.magicOption
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
        .then(zap=> {
            (zap.elementOption)? res.send({message: 'ok', attributes: zap.element_attributes}): res.send({message: 'ok', attributes:[]});
            
        }).catch(error => {res.status(404).send('not found')})
}

module.exports = {
    saveScriptData,
    getElementAttribute
}