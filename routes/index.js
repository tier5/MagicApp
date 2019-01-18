/**
 * Name  : index.js
 * Purpose : All Routes of the application
 */
var express = require('express');
var router = express.Router();

// import all controllers for the routes
var { createZap,
      getZaps,
      deleteZap,
      updateZap, 
      getUserZapsStats}                               = require('../controllers/zapController');
var { saveScriptData, getElementAttribute}            = require('../controllers/scriptController');
var { usersZaps,getScriptZaps,subscribtionZaps}       = require('../controllers/zapierController');
var { isAuthorized ,
      isUserExists,
      isUserSubscribed,
      onlyAdminCan,
      upload}                                         = require('./middleware');
var { getAllPlansCtrl,
      updateUserSubscribtion,
      retriveUsersCard,
      addNewCardToUser,
      deleteUserCard, usersDefaultCard, 
      getUserDefaultCardInfo}                         = require('../controllers/stripeController');
var { userLogin,
      userRegister,
      userForgetPassword,
      userResetPassword,
      userUpdatePassword, 
      getUserPrimaryData, checkEmailExists}          = require('../controllers/authController');
var { createUser,
      getAllUsers,
      updateUser,updateProfile, cancelMembership}    = require('../controllers/usersController');

var { createUserFromHook,
      deleteUserFromHook,
      suspendUserFromHook,
      unsuspendUserFromHook }                         = require('../controllers/hooksController');

var { addDomain, 
      getAllDomain, 
      updateDomain, 
      deleteDomain, 
      updateDomainStatus, blockDomainId}              = require('../controllers/domainController');

const { createTutorial, 
        getAllTutorials, 
        getTutotialById, 
        updateTutorials, deleteTutorial}              = require('../controllers/tutorialsController');

/**
 * Users Registration, Login, Forget Password and Reset Password
 */
  router.post('/register',isUserExists,userRegister);
  router.post('/login',userLogin);
  router.post('/forget-password',userForgetPassword);
  router.post('/reset-password/:token',userResetPassword);
  router.put('/change-password',userUpdatePassword);
  router.post('/register/validate-email', checkEmailExists);

/**
 * Create, read, update and delete Zaps
 */
  router.post('/zaps',isAuthorized,isUserSubscribed,createZap)
  router.get('/zaps',isAuthorized, isUserSubscribed,getZaps);
  router.delete('/zaps/:id',isAuthorized, isUserSubscribed,deleteZap);
  router.put('/zaps/:id',isAuthorized, isUserSubscribed,updateZap);
  router.get('/zaps/stats', isAuthorized, isUserSubscribed, getUserZapsStats);

// Saves script's data to database
  router.post('/script-data',saveScriptData);
  router.get('/script-data/:id',getElementAttribute);

  /**
   * Profile 
   */
  router.put('/profile', updateProfile)
/**
 * Zapier Authenicate and send data to zapier
 */
  router.post('/users_script_zap/:zapId',getScriptZaps);
  router.get('/users_zaps/:api_key',usersZaps);
  router.post('/users/:api_key/users_script_zap/:zapId/subscribe', subscribtionZaps)

/**
 * Admin get users and active , deactive users's activety
 */
  router.get('/users',isAuthorized,onlyAdminCan,getAllUsers);
  router.put('/users/:id', isAuthorized,onlyAdminCan,updateUser);
  router.post('/users',isAuthorized,onlyAdminCan,createUser);
  router.get('/users/basic', isAuthorized,getUserPrimaryData)

/**
 * Stripe
 */
  router.get('/plans',getAllPlansCtrl);
  router.put('/subscriptions',updateUserSubscribtion);
  router.get('/cards',getUserDefaultCardInfo);
  router.post('/cards',addNewCardToUser);
  router.delete('/cards/:cardId',deleteUserCard);
  router.put('/cards/:cardId',usersDefaultCard);
  router.delete('/cancel-membership', cancelMembership)

/**
 * WebHooks
 */
  router.post('/hooks/users',upload.single('avatar'), createUserFromHook);
  router.post('/hooks/users-delete', upload.single('avatar'),deleteUserFromHook);
  router.post('/hooks/users-suspend', upload.single('avatar'), suspendUserFromHook);
  router.post('/hooks/users-unsuspend', upload.single('avatar'), unsuspendUserFromHook);

  /**
   * Tutorials
   */
  router.post('/tutorials',isAuthorized, onlyAdminCan, createTutorial);
  router.get('/tutorials', isAuthorized, getAllTutorials);
  router.get('/tutorials/:id',isAuthorized, onlyAdminCan, getTutotialById);
  router.put('/tutorials/:id', isAuthorized, onlyAdminCan, updateTutorials);
  router.delete('/tutorials/:id', isAuthorized, onlyAdminCan, deleteTutorial);

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
  
  // @todo make use for this route currently not in use
  router.post('/users/:api_key/users_script_zap/:zapId/unsubscribe',(req,res)=>{
    return res.status(200).send({message : 'Ok'})
  })


module.exports = router;
