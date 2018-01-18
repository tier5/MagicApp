var Users = require('../models/users');
var bcrypt = require('bcrypt');

function userRegister(req,res,next){
  var body = req.body;
  var user = new Users(body)
  user.save().then((data)=>{
    res.status(200).send({status:true,message:"User created", token:data.accessToken})
  }).catch((err)=>{
    res.status(400).send({status:false, err: err, message :err.message});
  })
}

function userLogin(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  Users.findOne({email}).then((user)=>{
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        res.status(200).send({status:true,message:"success", token:user.accessToken})
      } else {
        console.log(err);
        res.status(400).send({status:false, err: err, message: 'Password Incorrect !'});
      }
    });
  }).catch((err)=>{
    res.status(400).send({status:false, message:'User not Exists!' });
  })
}

module.exports = {
    userRegister,
    userLogin
}