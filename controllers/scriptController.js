var ZapData = require('../models/zaps');

module.exports = function(body){
   var script_params = body.params
   ZapData.find({zapId : body.zapId}).then(function(data){
    if (!data.length){
        //console.log('New');
        zp = new ZapData()
        zp.zapId = body.zapId
        zp.location= body.location
        for (prop in script_params){
            zp.params.push({
                field_name : prop,
                field_value : script_params[prop]
            })
        }
        zp.save().then(function(data){
            //console.log(data);
        }).catch(function(err){
            console.log(err);
        })
    } else {
        //console.log('Old');
        var zap = data[0];
        zap.location= body.location;
        zap.params = []
        for (prop in script_params){
            zap.params.push({
                field_name : prop,
                field_value : script_params[prop]
            })
        }
        zap.save().then(function(data){
            //console.log(data);
        }).catch(function(err){
            console.log(err);
        })
    }
   })
}