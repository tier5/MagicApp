

var Users = require('../models/users');
var _ = require('lodash');
var mongoose = require('mongoose');
module.exports= function(body){
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
                var zaps = data[0].zaps
                var zap = _.find(zaps, function(o) { return o._id = body.zapId; });
                resolve(zap)
            }
        })
    })
}