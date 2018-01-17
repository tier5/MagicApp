var ZapData = require('../models/zaps');

module.exports = function(body){
   var script_params = body.params
   var script_params = body.params
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
}