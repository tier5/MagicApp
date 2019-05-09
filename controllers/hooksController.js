/**
 * hooksController.js
 * @description It is a controller file for a webhook into the magic app
 */

const Users                                 = require('../models/users');
const _                                     = require('lodash');
const Plans                                 = require('../config/plans.config');
const moment                                = require('moment');
const { deleteCustomer }                    = require('../helpers/stripe');
const { createAccessToken }                 = require('../helpers/jwt');
const { userWarehousing, removeUser}        = require('./usersController');
const { createUserSubscriptionHistory,
        removeUserHistory, 
        getUserSubscriptionHistoryById}     = require('./userSubscriptionHistoryController');
const { emitTotalDataStatistics }           = require('../helpers/socket');
var {resetZapsOptionsValue}                 = require('./zapController');

 /**
  * Function to create a user from a hook
  */
 function createUserFromHook(req,res){
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    if(!token || token !== testTokenNumber){
        let data = {http_code : 200, status :false , message : 'Token mismatch!'}
        return res.status(200).send({data: data})
    };

    if (!email){ return res.status(200).send({data: {message : 'email is required!' , status : false, http_code: 200}})}
    email = email.toLowerCase()
    Users.findOne({email: email}).then((user)=>{
        if(user) {
            updateHookedUser(req, res, user);
        } else {
            createNewHookedUser(req,res);
        }
    }).catch(err => {
        let data = { message : err.message , http_code : 200, status :false}
        res.status(200).send({data : data})
    })
    
 };



 async function createNewHookedUser(req,res){
    try {
        let email = req.body.email;
        let plan  = req.body.plan ? req.body.plan.trim().toUpperCase() : 'PROFESSIONAL';

        let affiliateId = req.body.aid || null;
        let name = req.body.name ? req.body.name.trim() : 'Hello'
        let accessToken = createAccessToken(email);
        var token = req.body.token ;
        let testTokenNumber  =  '1234511';
         // checking token 
        if(!token || token != testTokenNumber){
            return res.status(200).send({data : { http_code : 200, status :false , message : 'Token mismatch!'}})
        };
        if (!email){ return res.status(200).send({ data : {message : 'Email is required!' , status : false , http_code: 200}})};

        let now = moment().unix();
        let nextMonthDate = function(){
            if (plan === 'STARTER'){
                return moment().add(14, 'days').unix();
            } else {
               return moment().add(30, 'days').unix();
            }
        }
        let findPlan = Plans.filter(o =>  o.planName == plan);
        let planId = findPlan[0].stripePlanId
        let planName = findPlan[0].planName;

        let newCustomerHistory = {
            startDate:  now,
            endDate:    nextMonthDate(),
            email:      email,
            planId:     planId,
            planName:   planName,
            order:      1,
            isTrial: false
        }

        if (plan === 'STARTER'){
            newCustomerHistory.isTrial = true
        }


        if(planName === 'PROFESSIONAL'){
            newCustomerHistory.maxAutomationCount = 10**10**10
        }
        
        if(planName === 'STANDARD') {
            newCustomerHistory.maxAutomationCount = 10000
        }

        let createNewHistory = await createUserSubscriptionHistory(newCustomerHistory);

        let newUser = {
            email: email,
            name: name,
            password: '123456',
            userType: 'paid',
            isSubscribed: true,
            affiliateId: affiliateId,
            accessToken: accessToken,
            currentSubscriptionId: createNewHistory._id,
            isHookedUser: true,
            stripe: {
                customer: {
                    id : null
                },
                subscription :{
                    id : null
                },
                plan: {
                    id : planId
                },
                cards:[],
                invoices:[]
            }
        };
        if (plan === 'STARTER'){
            newUser.subscriptionStatus = 'trialing'
        }
        let newUserCreated = await Users.create(newUser);
        emitTotalDataStatistics()
        return res.status(200).send({ data : {http_code : 200, status :true , message : 'User Created'}})
    } catch (error) {
        res.status(200).send({ data : {message : error.message, status:false , http_code:200} })
    }
 };

 async function updateHookedUser(req, res, user){
    try {
        let plan = req.body.plan ? req.body.plan.toUpperCase() : null;
        let totalPlans = ['STARTER', 'STANDARD', 'PROFESSIONAL']
        let name = req.body.name;
        let email = req.body.email;
        var token = req.body.token ;
        let testTokenNumber  =  '1234511';
         // checking token 
        if(!token || token != testTokenNumber){
            return res.status(200).send({data : { http_code : 200, status :false , message : 'Token mismatch!'}})
        };
        if (!email){ return res.status(200).send({ data : {message : 'Email is required!' , status : false , http_code: 200}})};
        let changePlan = false
        if (plan.length && totalPlans.includes(plan)){
            changePlan = true
        }

        let history = await getUserSubscriptionHistoryById(user.currentSubscriptionId);
        if (changePlan){
            if (history.planName !== plan){
                changePlan = true
            } else {
                changePlan = false
            }
        }
        let newSubscriptionHistory = null;
        if (changePlan){
            let nextMonthDate = function(){
                
                return moment().add(30, 'days').unix();
                
            }
            let findPlan = Plans.filter(o =>  o.planName == plan);
            let planId = findPlan[0].stripePlanId
            let planName = findPlan[0].planName;
            let now = moment().unix();

            let newCustomerHistory = {
                startDate:  now,
                endDate:    nextMonthDate(),
                email:      email,
                planId:     planId,
                planName:   planName,
                order:      history.order + 1,
                isTrial:    false
            }

            if (planName === 'STANDARD'){
                newCustomerHistory.maxAutomationCount = 10000;
            }
            if (planName === 'PROFESSIONAL'){
                newCustomerHistory.maxAutomationCount = 10**10**10;
            }
            newSubscriptionHistory = await createUserSubscriptionHistory(newCustomerHistory);
        }
        if (newSubscriptionHistory){
            user.currentSubscriptionId = newSubscriptionHistory._id;
            user.subscriptionStatus = 'active'
            user.isSubscribed = true
            user.stripe.plan.id = newSubscriptionHistory.planId
        }
        user.name = name
        let update = await user.save();
        resetZapsOptionsValue(user.accessToken);
        return res.status(200).send({data : {message : 'User updated', http_code: 200, status: true}});
        
    } catch (error) {
        return res.status(200).send({data: { message : error.message, http_code:200, status: false}})
    }
 }

 async function deleteUserFromHook(req,res){
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({data : { http_code : 200, status :false , message : 'Token mismatch!'}})
    };
    // checking email
    if (!email){ return res.status(200).send({ data : {message : 'Email is required!' , status : false , http_code: 200}})};
    email = email.toLowerCase()
    try {

        let user = await Users.findOne({email : email });

        if (!user) {
            return res.status(200).send({data: { message: 'User not exists!', status : false, http_code: 200 }});
        }
        let backUpUser = await userWarehousing(email);
        // remove customer from stripe if exists or else remove the user
        
        let customerId = user.stripe.customer.id;

        if (user.userType == 'paid' && customerId){
            let stripeDeleteCustomer = await deleteCustomer(customerId);
        }
        let removeThisUser = await removeUser(email);
        let removeHistory = await removeUserHistory(email);
        emitTotalDataStatistics()
        return res.status(200).send({data: { http_code : 200, status :true , message : 'User deleted!'}})

    } catch (error) {
        return res.status(200).send({data : { message : error.message, http_code : 200, status :false}})
    }
 }

 function suspendUserFromHook(req, res) {
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({data: {http_code : 200, status : false , message : 'Token mismatch!'}})
    };
    // checking email
    if (!email){ return res.status(200).send({data: {message : 'email is required!' , status : false, http_code: 200}})};
    email = email.toLowerCase()

    Users.findOneAndUpdate({
        email : email
    },
    {
        $set :{
            isActive : false,
        }
    }).then(updated =>{
        if (!updated) { return res.status(200).send({data: { status : false , message : 'Account not found!', http_code: 200}})}
        return res.status(200).send({data: { status :true , message : 'Account suspended', http_code: 200}});
    }).catch(error=>{
        return res.status(200).send({ data: { message : error.message, status:false, http_code: 200}});
    })
 }

 function unsuspendUserFromHook (req, res) {
    var token = req.body.token ;
    let testTokenNumber  =  '1234511';
    var email = req.body.email;
    // checking token 
    if(!token || token != testTokenNumber){
        return res.status(200).send({ data : { status :false , message : 'Token mismatch!' , http_code: 200}})
    };
    // checking email
    if (!email){ return res.status(200).send({data :  {message : 'email is required!' , status : false, http_code: 200}})};
    email = email.toLowerCase()

    Users.findOneAndUpdate({
        email : email
    },
    {
        $set :{
            isActive: true,
        }
    }).then(updated =>{
        if (!updated) { return res.status(200).send({ data : { status : false , message : 'Account not found!', http_code: 200}})}
        return res.status(200).send({ data : {status : true , message : 'Account unsuspended', http_code: 200}});
    }).catch(error=>{
        return res.status(200).send({ data : {message : error.message, status:false, http_code: 200}});
    })
 }

  module.exports = {
    createUserFromHook,
    deleteUserFromHook,
    suspendUserFromHook,
    unsuspendUserFromHook
  }
