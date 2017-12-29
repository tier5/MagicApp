const jwt = require('jsonwebtoken');

module.exports.create = function(obj){
    var token = jwt.sign(obj,process.env.JWT_SECRET,{ algorithm: 'HS256', expiresIn: 60*60*24 });
    return token;
};

module.exports.decode = function(token){
    jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
        return new Promise(function(resolve,reject){
            if(err){
                reject(err);
            } else {
                resolve(decoded);
            }
        })
    })
}
