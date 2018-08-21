/**
 * Name: domainController.js
 * Purpose : domain operation
 */

var Users = require('../models/users');
var _ = require('lodash');
var mongoose = require('mongoose');

/**
 * Add Domain
 * @param req
 * @param res
 * @param next
 */
function addDomain(req,res,next) {
    var body = req.body;
    var token = req.headers.token || req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .then(user => {
            user.domains.push({name:body.name});
            user.save(function(err) {
                if(err) {
                    var errors = [];
                    if (err.name === 'ValidationError') {
                        for (field in err.errors) {
                            errors.push(err.errors[field].message);
                        }
                    }
                    return res.status(400).send({ message:'Please check all the data!',status:false,errorMessage: errors });
                }
                else {
                    Users
                        .find({"_id": user._id})
                        .then(function (userDomain) {
                            var userDomains = userDomain[0].domains;
                            return res.status(200).send({status:true,message:'Domain added', domains: userDomains});
                        })
                        .catch(error => {
                            return res.status(403).send({ message:'Whoops Something Went Wrong!',status:false });
                        });
                }
            });
        })
        .catch(err => {
            return res.status(403).send({ message:'Whoops Something Went Wrong!',status:false });
        })
}

/**
 * Fetch domain for a user
 * @param req
 * @param res
 * @param next
 */
function getAllDomain(req,res,next) {
    var token = req.headers.token || req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .then(user => {
            var domains = user.domains;
            return res.status(200).send({domains:domains , status:true,message:'fetched all domains'});
        })
        .catch(err => {
            return res.status(403).send({ message:'Whoops Something Went Wrong!',status:false });
        })
}

/**
 * Update a domain
 * @param req
 * @param res
 * @param next
 */
function updateDomain(req,res,next) {
    var body = req.body;
    var token = req.headers.token || req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .then(user => {
            return Users.update({
                "_id": user._id,
                "domains._id": req.body._id
            }, {
                $set: {
                    "domains.$.name": req.body.name
                }
            })
        })
        .then(updatedUsers=> {
            if (updatedUsers.ok !== '0') {
                Users
                    .findOne({accessToken: token})
                    .then(user => {
                        var domains = user.domains;
                        return res.status(200).send({domains:domains, status:true, message:'Update domain..'});
                    })
                    .catch(err => {
                        return res.status(403).send({message:'Whoops Something Went Wrong!', status:false });
                    })
            } else {
                console.log(updatedUsers);
                return res.status(400).send({message:'Document not found!', status:false });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(403).send({message:'Whoops Something Went Wrong!', status:false });
        })
}

/**
 * Delete a domain
 * @param req
 * @param res
 * @param next
 */
function deleteDomain(req,res,next) {
    var domain_id = req.params.domainId;
    var token = req.headers.token || req.headers.authorization;

    var conditions = { accessToken : token , "domains._id": domain_id}
        ,   update = {$pull : { domains : {_id : domain_id}}}
        ,   options = {} ;

    Users
        .update(conditions,update,options)
        .then(result=>{
            if (result.n==1){
                return res.status(200).send({message: 'Domain Deleted', status :true})
            }
        })
        .catch(err=>{
            console.log(err);
            return res.status(400).send({message: 'Something went wrong',status :false})
        })
}

/**
 * Update Domain status
 * @param req
 * @param res
 * @param next
 */
function updateDomainStatus(req,res,next) {
    var domain_id = req.params.domainId;
    var token = req.headers.token || req.headers.authorization;
    var active = true;
    Users
        .findOne({accessToken: token})
        .then(user => {
            user.domains.forEach(function(domain, index, arr) {
                if (domain._id == domain_id) {
                    active = domain.isActive
                }
            });
            return Users.update({
                "_id": user._id,
                "domains._id": domain_id
            }, {
                $set: {
                    "domains.$.isActive": !active
                }
            })
        })
        .then(updatedUsers=> {
            if (updatedUsers.ok !== '0') {
                var message = 'Domain enable';
                if (active) {
                    message = 'Domain disabled'
                }
                return res.status(200).send({status:true,message: message});
            } else {
                console.log(updatedUsers);
                return res.status(400).send({ message:'Domain not found!',status:false });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(403).send({ message:'Whoops Something Went Wrong!',status:false });
        })
}
function blockDomainId(req,res,next) {
    var domain_id = req.params.domainId;
    var active = false;
    Users
        .findOne({'domains._id' : domain_id})
        .then(user => {
            user.domains.forEach(function (domain, index) {
                if (domain._id == domain_id) {
                    active = domain.isActive;
                }
            });
            if (active) {
                return res.status(200).send({status:true,message: 'Domain active'});
            } else {
                return res.status(400).send({ message:'Domain Inactive!',status:false });
            }
        }).catch(err => {
            console.log(err);
            return res.status(403).send({ message:'Domain not found!',status:false });
        })
}
/**
 * Export
 * @type {{addDomain: addDomain, getAllDomain: getAllDomain, updateDomain: updateDomain, deleteDomain: deleteDomain, updateDomainStatus: updateDomainStatus}}
 */
module.exports = {
    addDomain,
    getAllDomain,
    updateDomain,
    deleteDomain,
    updateDomainStatus,
    blockDomainId
}
