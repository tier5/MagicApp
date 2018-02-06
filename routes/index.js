var express = require('express');
var router = express.Router();

var {userLogin,userRegister,getAllUsers,updateUser} = require('../controllers/authController');
var {createZap,getZaps,deleteZap,updateZap} = require('../controllers/zapController');
var {saveScriptData} = require('../controllers/scriptController');
var {usersZaps,getScriptZaps} = require('../controllers/zapierController');
var {isAuthorized , isUserExists} = require('./middleware');
var {getAllPlansCtrl} = require('../controllers/stripeController');
// register user
router.post('/register',isUserExists,userRegister); 
router.post('/login',userLogin);
// users Zap CRUD
router.post('/zaps',createZap)
router.get('/zaps',getZaps);
router.delete('/zaps/:id',deleteZap);
router.put('/zaps/:id',updateZap);
// endpoint for script to save data to the db 
router.post('/script-data',saveScriptData);
// endpoint for zapier to get script data
router.get('/users_script_zap/:zapId',getScriptZaps);
// endpoint for sending user's zap 
router.get('/users_zaps/:api_key',usersZaps);

// get all users if the user is admin 
router.get('/users',isAuthorized,getAllUsers);
// deactive user for admin
router.put('/users/:id', isAuthorized,updateUser);

// stripe plans
router.get('/plans',getAllPlansCtrl);

// webhook for stripe
router.post("/stripe/webhook/customer/subscription/trial_will_end", function(request, response) {
    // Retrieve the request's body and parse it as JSON
    //var event_json = JSON.parse(request.body);
    console.log(typeof request.body);
    //var body = request.body;
    //console.log('event id ', body.id);
    // Do something with event_json
  
    response.status(200).send('success');
  });
module.exports = router;
