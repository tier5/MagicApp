var express = require('express');
var router = express.Router();

var {userLogin,userRegister} = require('../controllers/authController');
var {createZap,getZaps,deleteZap} = require('../controllers/zapController');
var {saveScriptData} = require('../controllers/scriptController');
var {usersZaps,getScriptZaps} = require('../controllers/zapierController');
var _ = require('lodash');
// register user
router.post('/register',userRegister); 
router.post('/login',userLogin)
// users Zap CRUD
router.post('/zaps',createZap)
router.get('/zaps',getZaps);
router.delete('/zaps/:id',deleteZap);
// endpoint for script to save data to the db 
router.post('/script-data',saveScriptData);
// endpoint for zapier to get script data
router.get('/users_script_zap/:zapId',getScriptZaps);
// endpoint for sending user's zap 
router.get('/users_zaps/:api_key',usersZaps);

module.exports = router;
