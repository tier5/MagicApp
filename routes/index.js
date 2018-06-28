/**
 * Name  : index.js
 * Purpose : All Routes of the application
 */
var express = require('express');
var router = express.Router();

// import all controllers for the routes
var {createZap,getZaps,deleteZap,updateZap}         = require('../controllers/zapController');
var {saveScriptData, getElementAttribute}           = require('../controllers/scriptController');
var {usersZaps,getScriptZaps}                       = require('../controllers/zapierController');
var { isAuthorized ,
      isUserExists,
      isUserSubscribed,
      onlyAdminCan}                                 = require('./middleware');
var { getAllPlansCtrl,
      updateUserSubscribtion,
      retriveUsersCard,
      addNewCardToUser,
      deleteUserCard, usersDefaultCard}             = require('../controllers/stripeController');
var { userLogin,
      userRegister,
      userForgetPassword,
      userResetPassword}                            = require('../controllers/authController');
var {createUser,getAllUsers, updateUser}            = require('../controllers/usersController');

var { createUserFromHook,
      deleteUserFromHook,
      suspendUserFromHook,
      unsuspendUserFromHook }                         = require('../controllers/hooksController');

var {addDomain, getAllDomain, updateDomain, deleteDomain, updateDomainStatus, blockDomainId} = require('../controllers/domainController');

/**
 * Users Registration, Login, Forget Password and Reset Password
 */
  router.post('/register',isUserExists,userRegister);
  router.post('/login',userLogin);
  router.post('/forget-password',userForgetPassword);
  router.post('/reset-password/:token',userResetPassword)

/**
 * Create, read, update and delete Zaps
 */
  router.post('/zaps',isUserSubscribed,createZap)
  router.get('/zaps',isUserSubscribed,getZaps);
  router.delete('/zaps/:id',isUserSubscribed,deleteZap);
  router.put('/zaps/:id',isUserSubscribed,updateZap);

// Saves script's data to database
  router.post('/script-data',saveScriptData);
  router.get('/script-data/:id',getElementAttribute);

/**
 * Zapier Authenicate and send data to zapier
 */
  router.get('/users_script_zap/:zapId',getScriptZaps);
  router.get('/users_zaps/:api_key',usersZaps);

/**
 * Admin get users and active , deactive users's activety
 */
  router.get('/users',isAuthorized,onlyAdminCan,getAllUsers);
  router.put('/users/:id', isAuthorized,onlyAdminCan,updateUser);
  router.post('/users',isAuthorized,onlyAdminCan,createUser)

/**
 * Stripe
 */
  router.get('/plans',getAllPlansCtrl);
  router.put('/subscriptions',updateUserSubscribtion);
  router.get('/cards',retriveUsersCard);
  router.post('/cards',addNewCardToUser);
  router.delete('/cards/:cardId',deleteUserCard);
  router.put('/cards/:cardId',usersDefaultCard);

/**
 * WebHooks
 */
  router.post('/hooks/users', createUserFromHook);
  router.post('/hooks/users-delete', deleteUserFromHook);
  router.post('/hooks/users-suspend', suspendUserFromHook);
  router.post('/hooks/users-unsuspend', unsuspendUserFromHook);


/**
 * Magic scripts
 */
  router.get('/domains', getAllDomain);
  router.post('/domains', addDomain);
  router.put('/domains/:domainId',updateDomain);
  router.delete('/domains/:domainId', deleteDomain);
  router.get('/domains-status/:domainId', updateDomainStatus);
/**
 * block-script
 */
  router.get('/block-iframe/:domainId', blockDomainId);


module.exports = router;
