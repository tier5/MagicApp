var express = require('express');
var router = express.Router();
var Users = require('../models/users')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var scriptVal = require('./fetchZapController');
var validation = require('../helpers/validations');
var scriptCtrl = require('../controllers/scriptController');
var ZapData = require('../models/zaps');
// register user
router.post('/register',function(req,res,next){
  var body = req.body;
  var user = new Users(body)
  user.save().then((data)=>{
    res.status(200).send({status:true,message:"User created", token:data.accessToken})
  }).catch((err)=>{
    res.status(400).send({status:false, err: err.errmsg});
  })
});
// login user 
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
// endpoints to create zaps 
router.post('/zaps',function(req,res,next){
  var body = req.body;
  var token = req.headers.token;
  
  Users.findOne({accessToken : token}).then(function(data){
    //console.log(data);
    //res.status(200).send({body: body,token : token});
    data.zaps.push(body);
    data.save().then(function(dt){
      res.status(200).send({message:'zap saved'});
    }).catch(function(err){
      console.log(err);
      res.status(400).send({message:'Something went wrong'});
    })
  }).catch(function(){
    res.status(403).send({message: 'Unautherized'});
  })
})
//endpoint to get zaps 
router.get('/zaps',function(req,res,next){
  var token = req.headers.token;
  Users.findOne({accessToken: token}).then(function(user){
    var zaps = user.zaps;
    res.status(200).send({zaps:zaps});
  })
})
// endpoint for script to save data to the db 
router.post('/script-data',function(req,res,next){
  //console.log(req.body);
  var body = req.body;
  var location = req.body.location;
  var script_params = req.body.params;
  //console.log(params);
  res.status(200).send({message:'Ok'});
  scriptVal(body).then((zap)=>{
    var zap_params = zap.params;
    validation.isAllParamsExists(zap_params,script_params).then(()=>{
      validation.isAllValidationPassed(zap_params,script_params).then(()=>{
        //console.log('Jai Mahesmati');
        scriptCtrl(req.body);

      }).catch(()=>{
        console.log('Params Validation Failed!')
      })
    }).catch((err)=>{
      console.log('Params does not exists');
    })
  }).catch((err)=>{
    console.log(err);
  })
})
// endpoint for zapier to get data from magic App
router.get('/magics/:api_key',function(req,res){
  var test = [];
  ZapData.aggregate([
    {
      $project:
      {
        _id:0,
        location:1,
        params:1
      }
    }
  ],function(err,data){
    if (err) { console.log(err) }
    else {
      var testArray = []
      data.forEach(obj=>{
        var tempObj = {}
        tempObj.location = obj.location;

        obj.params.forEach(obj2 => {
          tempObj[obj2.field_name]= obj2.field_value
        });
        testArray.push(tempObj);
      })
      res.status(200).send(testArray);
    }
  })
})

module.exports = router;
