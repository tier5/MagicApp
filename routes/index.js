var express = require('express');
var router = express.Router();
var Users = require('../models/users')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var scriptVal = require('./fetchZapController');
var validation = require('../helpers/validations');
var scriptCtrl = require('../controllers/scriptController');
var ZapData = require('../models/zaps');
var _ = require('lodash');
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
        console.log(err);
        res.status(400).send({status:false, err: err, message: 'Password Incorrect !'});
      }
    });
  }).catch((err)=>{
    res.status(400).send({status:false, message:'User not Exists!' });
  })
})
// endpoints to create zaps 
router.post('/zaps',function(req,res,next){
  var body = req.body;
  var token = req.headers.token || req.headers.authorization;
  Users.findOne({accessToken : token}).then(function(data){
    //console.log(data);
    //res.status(200).send({body: body,token : token});
    
    data.zaps.push(body);
    data.save().then(function(dt){
      var zaps = dt.zaps
      var zap = zaps.find((el)=>{
        return el.name == body.name
      })
      res.status(200).send({message:'Zap created !',zap:zap,status:true});
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
  var token = req.headers.token || req.headers.authorization;
  Users.findOne({accessToken: token}).then(function(user){
    var zaps = user.zaps;
    res.status(200).send({zaps:zaps , status:true,message:'fetched all zap'});
  }).catch((err)=>{
    res.status(403).send({ message:'Whoops Something Went Wrong!',status:false })
  })
});

router.delete('/zaps/:id',function(req,res,next){
  var id = req.params.id
  var token = req.headers.token||req.headers.authorization
  scriptVal.deleteZap(id,token,res);
});
// endpoint for script to save data to the db 
router.post('/script-data',function(req,res,next){
  //console.log(req.body);
  var body = req.body;
  var location = req.body.location;
  var script_params = req.body.params;
  //console.log(params);
  res.status(200).send({message:'Ok'});
  scriptVal.getZap(body).then((zap)=>{
    var zap_params = zap.params;
    // console.log(zap_params);
    // console.log(script_params);
    validation.isAllParamsExists(zap_params,script_params).then(()=>{
      validation.isAllValidationPassed(zap_params,script_params).then(()=>{
        //console.log('Jai Mahesmati');
        scriptCtrl(req.body);

      }).catch((err)=>{
        console.log(err);
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
router.get('/users_script_zap/:zapId',function(req,res){
  var zapId = req.params.zapId
    // fetching all data from database for the scriptid
    ZapData.find({zapId:zapId}).then((data)=>{
      if (data.length==0){
        res.status(200).send({response: [], message: 'Success',status:true});
      } else {
        var resArr = []
        // changing nested document to linear data 
        try {
          data.forEach(function(obj){
            var eachObj = {}
            eachObj.location = obj.location;

            obj.params.forEach(ob => {
              eachObj[ob.field_name] = ob.field_value
            });

            resArr.push(eachObj);
          });

          res.status(200).send({response: resArr, message: 'Success',status:true});
        } catch (error) {
          console.log(error);
        }
      }
        
    }).catch((err)=>{
      console.log(err);
      res.status(400).send({message: 'Something went wrong!',status:false,response:[]});
    })
});
// endpoint for sending user's zap to 
router.get('/users_zaps/:api_key',function(req,res,next){
  Users.aggregate([
    {
        $match:{
            "accessToken" : req.params.api_key
        }
    }
  ],function(err,data){
      if(err) {
          console.log(err);
          res.status(400).send({message:'Whoops something went wrong',status:false})
      } else {
          var zaps = data[0].zaps
           var resObj = []
          _.forEach(zaps, function(value) {
            var filterZap = {
              id : value._id,
              name: value.name
            }
            resObj.push(filterZap);
          });

          res.status(200).send(resObj);
      }
  })
})


module.exports = router;
