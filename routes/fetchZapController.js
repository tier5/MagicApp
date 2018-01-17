

var Users = require('../models/users');
var _ = require('lodash');
var mongoose = require('mongoose');
module.exports.getZap= function(body){
    return new Promise(function(resolve,reject){
        var id = mongoose.Types.ObjectId(body.zapId);
        Users.aggregate([
            {
                $match:{
                    "zaps._id":id
                }
            },
            {
                $project:{
                _id: 0,
                zaps: 1 
                }
            }
        ],function(err,data){
            if(err) {
                console.log(err);
                reject(err)
            } else {
                //console.log(data);
                if (data.length == 0){
                    reject({message:'Zap not found!'});
                } else {
                    var zaps = data[0].zaps
                    var zap = _.find(zaps, function(o) { return o._id = body.zapId; });
                    resolve(zap)
                }
            }
        })
    })
}

module.exports.deleteZap = function(id,token,res){
    Users.findOne({accessToken: token}).then((data)=>{
        //console.log(data.zaps);

    var new_zaps = _.remove(data.zaps, function(n) {
            return n._id != id
          });
          data.zaps = new_zaps 
          data.save().then((dt)=>{
            //console.log(dt);
            res.status(200).send({message: 'Zap Deleted',status :true})
          }).catch((err)=>{
            res.status(400).send({message: 'Something went wrong',status :false})
          })
    })
}