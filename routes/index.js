var express = require('express');
var router = express.Router();
var Users = require('../models/users')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/register',function(req,res,next){
  var body = req.body;
  var user = new Users(body)
  user.save().then((data)=>{
    res.status(200).send({status:true,message:"User created", data:data})
  }).catch((err)=>{
    res.status(400).send({status:false, err: err});
  })
});

router.post('/login',function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  Users.findOne({email}).then((user)=>{
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        res.status(200).send({status:true,message:"success", token:user.accessToken})
      } else {
        res.status(400).send({status:false, err: err});
      }
    });
  }).catch((err)=>{
    res.status(400).send({status:false, err: err});
  })
})




module.exports = router;
