/**
 * Name: stripeController.js
 * Purpose : Stripe Controller
 */
var _                                               = require('lodash');
var moment                                          = require('moment');
var Users                                           = require('../models/users');
const Plans                                         = require('../config/plans.config');
const UserSubscriptionHistory                       = require('../models/userSubscriptionHistory');
const { changeUserSubscriptionHistory,
        getUserSubscriptionHistoryById,
        createUserSubscriptionHistory  }            = require('./userSubscriptionHistoryController');


var {   getAllPlans, createCard , 
        createSubscription, updateSubscription,
        retriveCustomerCard,createSource,
        defaultSource,deleteCard,retrieveCustomer, 
        retrieveCard, finalizeInvoice,
        createCustomer,deleteCustomer}             = require('../helpers/stripe');

var {resetZapsOptionsValue} = require('./zapController');








// addDate method to date object 
Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
}

/**
 * function to send all the plans
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
function getAllPlansCtrl (req,res,next){
    getAllPlans()
        .then((plans)=>{
            res.status(200).send({status:true, message: 'success' , data : plans.data});
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).send({status:false, message : 'Whoops! something went wrong'})
        })
}

/**
 * function to update user's subscription 
 * @param {object} req
 * @param {object} res 
 * @return response
 */

 async function updateUserSubscribtion(req,res){
    var token = req.headers.authorization;
    let planName = req.body.plan;
    let cardToken = req.body.cardToken
    let plan = Plans.filter(obj=> {
        return obj.planName == planName
    });
    let customerId;
    if (!plan.length){
        return res.status(400).send({message: 'Wrong plan selected', status: false});
    }
    let planId = plan[0].stripePlanId
    try {
        let user = await Users.findOne({accessToken: token});
        
        // Thus process change a user from hooked to stripe user
        if(!user.stripe.customer.id){
            let customer = await createCustomer(user.email, cardToken);
            user.stripe.customer = {
                id : customer.id
            }
            user.stripe.cards = [];
            user.stripe.cards.push({
                id : customer.default_source,
                isDefault : true
            })
            let subscription = await createSubscription(customer.id, planId, false);
            user.stripe.subscription = {
                id: subscription.id,
            };
            user.stripe.plan ={
                id : planId
            }
            customerId = customer.id
            user.isHookedUser = false
            user.isSubscribed = true
            user.subscriptionStatus = subscription.status;
            let newCustomerHistory = {
                startDate: subscription.current_period_start,
                endDate: subscription.current_period_end,
                email: user.email,
                planId: planId,
                planName: planName,
                isTrial: true,
            }
            let newHistory = await createUserSubscriptionHistory(newCustomerHistory)
    
            user.currentSubscriptionId = newHistory._id;
    
            
            let updatedUser = await user.save();

            let sendUserData = {
                email : updatedUser.email,
                name : updatedUser.name,
                isAdmin : updatedUser.isAdmin,
                isActive : updatedUser.isActive,
                isHooked: updatedUser.isHooked,
                isSubscribed: true,
                subscriptionStatus: user.subscriptionStatus
            }
            resetZapsOptionsValue(user.accessToken);
            return res.status(200).send({ status: true, message: `Thanks, You're ready to go.`, token: updatedUser.accessToken , user: sendUserData });

        } else {

            let currentPlanName = getPlanName( user.stripe.plan.id );
            try {
                let isAllowed = await checkUserDowngradeAllowed( user.zaps.length, currentPlanName, planName);

            } catch (data) {
                return res.status(400).send({
                        message: `You need to delete ${data.zapDiff} ${ data.zapDiff > 1 ? 'zaps': 'zap'} in order to downgrade`,
                        status: false
                    })
            }
            let sub = await updateSubscription(user.stripe.subscription.id,planId);
            let updatedUser = await changeUserSubscriptionHistory(sub, user, planName, planId);
            let sendUserData = {
                email : updatedUser.email,
                name : updatedUser.name,
                isAdmin : updatedUser.isAdmin,
                isActive : updatedUser.isActive,
                isSubscribed: true,
                isHooked: updatedUser.isHooked,
                subscriptionStatus: user.subscriptionStatus
            }
            return res.status(200).send({status: true, message: `Thanks, You're ready to go.`, token: updatedUser.accessToken , user: sendUserData });
        }
        
    } catch (err) {
        
        if (customerId) {
            let delCus = await deleteCustomer(customerId);
        }
        return res.status(500).send({status: false, message: err.message});
    }
 }

 /**
  * Function to retrive a user's card 
  * @param {object} req
  * @param {object} res
  * @returns response
  */
 function retriveUsersCard(req,res){
    var token = req.headers.authorization;
    var customerId;
    var userCards=[]
    Users
        .findOne({accessToken : token })
        .select({stripe: 1})
        .then(user=>{
            customerId = user.stripe.customer.id;
            if (customerId){
                return retriveCustomerCard(customerId)
            } else {
                res.status(200).send({message: 'Cards', status : true, data:[]});
            }
        })
        .then(data=>{
            cards = data.data
            return retrieveCustomer(customerId)
        })
        .then(customer=>{
            var defaultCard = customer.default_source;
            cards.forEach(obj => {
                if (defaultCard == obj.id){
                    obj.defaultCard = true
                } else {
                    obj.defaultCard = false
                }
            });
            res.status(200).send({message: 'Cards', status : true, data: cards});
        })
        .catch(err=> console.log(err));
 };
 /**
  * Function to add a new card to the user
  * @param {Object} req 
  * @param {Object} res 
  */
 async function addNewCardToUser(req,res){
    var token = req.headers.authorization;
    var cardToken = req.body.cardToken;
    var customerId, cardId;
    try {
        let user = await Users.findOne({ accessToken : token});
        
        customerId = user.stripe.customer.id;
        let card =  await createSource(customerId,cardToken);
        cardId = card.id;
        let defaultCardSource = await defaultSource(customerId, cardId);
        user.stripe.cards = [];
        user.stripe.cards.push({
            id : cardId, isDefault: true
        })
        let updateUser = await user.save();
        return res.status(200).send({message: 'Card Added',status : true})
        

    } catch (error) {
        return res.status(400).send({message: error.message, status: false})
    }
    
 };
/**
 * Function to delete a card 
 * @param {Object} req 
 * @param {Object} res 
 */
 function deleteUserCard(req,res){
    var cardId = req.params.cardId;
    var token = req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .select({stripe:1})
        .then(user=>{
            let customerId = user.stripe.customer.id;
            //console.log(cardId);
            return deleteCard(customerId,cardId)
        })
        .then(confirmation=>{
            if(confirmation.deleted){
                res.status(200).send({message: 'Card Deleted',status : true})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).send({message: err.message, status:false});
        })
 }

 /**
  * Function to change user's default card
  * @param {object} request
  * @param {object} response
  */
 function usersDefaultCard(req,res){
    var cardId = req.params.cardId;
    var token = req.headers.authorization;
    Users
        .findOne({accessToken: token})
        .select({stripe:1})
        .then(user=>{
            let customerId = user.stripe.customer.id;
            //console.log(cardId);
            return defaultSource(customerId,cardId);
        })
        .then(confirmation=>{
            res.status(200).send({message: 'Default Card Changed',status : true})
        })
        .catch(err=>{
            console.log(err);
            res.status(400).send({message: err.message, status:false});
        })
 }

async function getUserDefaultCardInfo(req, res){
    try {
        let token = req.headers.authorization;

        let thisUser = await Users.findOne({ accessToken : token}).select({ stripe : 1});

        if(!thisUser){
            return res.status(404).send({message : 'User not found', status: false, data:[] });
        } 

        let customerId = thisUser.stripe.customer ? thisUser.stripe.customer.id : null;
        if(!customerId){
            return res.status(400).send({message : 'Customer not found', status : false, data:[] });
        }
        let getCustomerInfo = await retrieveCustomer(customerId);

        let defaultCard = getCustomerInfo.default_source;
        let card = await retrieveCard(customerId, defaultCard);
        let cards = [];
        cards.push(card);
        return res.status(200).send({ message : 'ok', status : true, data: cards});
    } catch (error) {
        return res.status(500).send({ message : error.message, status : false, data:[] });
    }
}

function checkUserDowngradeAllowed(zapLength, currentPlan, nextPlan){
    return new Promise((resolve, reject)=>{
        switch(nextPlan){
            case 'STARTER':
    
                if (currentPlan == 'STANDARD'){
                    if (zapLength > 10){
                        return reject({allowed: false, zapDiff : Math.abs(zapLength-10)})
                    } else {
                        return resolve({allowed: true, zapDiff: Math.abs(zapLength-10)})
                    }
                } else if(currentPlan == 'PROFESSIONAL'){
                    if (zapLength > 10){
                        return reject({allowed: false, zapDiff : Math.abs(zapLength-10)})
                    } else {
                        resolve({allowed: true, zapDiff: Math.abs(zapLength-10)})
                    }
                }
    
            case 'STANDARD':
    
                if (currentPlan == 'PROFESSIONAL'){
                    if (zapLength > 50){
                        return reject({allowed: false, zapDiff : Math.abs(zapLength-50)})
                    } else {
                        return resolve({allowed: true, zapDiff: Math.abs(zapLength-50)})
                    }
                } else {
                    return resolve({allowed: true, zapDiff: Math.abs(zapLength-50)})
                }
    
            case 'PROFESSIONAL':
    
            return resolve({allowed: true, zapDiff: Math.abs(zapLength-50)})
        }   
    })
    
}

function getPlanName(planId) {
    let plan = Plans.filter(obj=> {
        return obj.stripePlanId == planId
    })
    if (!plan.length){
        return null
    } else {
        return plan[0].planName
    }
}

/**
 * Function to listen to stripe webhook event
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
async function stripeWebhookEventListener(req, res, next){

    let signature = req.headers["stripe-signature"];

    if(!signature){
        return res.status(403).send('Forbidden!');
    }
    let eventName = req.body.type;

    switch(eventName){
        case 'customer.subscription.trial_will_end':
            customerSubscriptionTrialWillEndEvent(req.body);
        case 'customer.subscription.updated':
            customerSubscriptionUpdatedEvent(req.body);
        case 'invoice.payment_failed':
            customerInvoicePaymentFailed(req.body);


    }

    return res.status(200).send('ok');
    
    
}
/**
 * Function to listen stripe customer subscription trail end  
 * @param {object} data 
 */
async function customerSubscriptionTrialWillEndEvent(data){
    try {
        let actualEndDate = data.data.object.ended_at
        let user = await Users.findOne({"stripe.customer.id": data.data.object.customer});
        if (!user.isHooked){
            let trialHistory = await UserSubscriptionHistory.findOne({email: user.email , isTrial: true});
            if(actualEndDate){
                trialHistory.actualEndDate = actualEndDate;
                let savetrial = await trialHistory.save()
            }
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * Function to listen to stripe customer subscription update
 * @param {object} data 
 */
async function customerSubscriptionUpdatedEvent(data){

    try {
        let customer                = data.data.object.customer;
        let eventData               = data.data.object
        let user                    = await Users.findOne({"stripe.customer.id": customer});

        if (!user) return

        let subscriptionHistory     = await getUserSubscriptionHistoryById(user.currentSubscriptionId);
        
        if (user.subscriptionStatus !== eventData.status){

            // case where a user subscription fails
            if (eventData.status === 'past_due' || eventData.status === 'unpaid'){
                user.subscriptionStatus = eventData.status
                user.isSubscribed = false
                let updateUser = await user.save()
                return 
            }
            // case when user trail is end and actual subscription started 
            if (user.subscriptionStatus ==='trailing' && eventData.status === 'active' ){
                if (subscriptionHistory.isTrial){
                    let newHistory = {
                        startDate:  eventData.current_period_start,
                        endDate:    eventData.current_period_end,
                        email:      subscriptionHistory.email,
                        planId:     subscriptionHistory.planId,
                        planName:   subscriptionHistory.planName,
                        isTrial:    false,
                        currentAutomationCount: subscriptionHistory.currentAutomationCount,
                        order:      subscriptionHistory.order + 1
                    }

                    let saveNewHistory = await createUserSubscriptionHistory(newHistory);

                    user.subscriptionStatus = eventData.status

                    user.currentSubscriptionId = saveNewHistory._id

                    let updateUser = await user.save()
                    return 

                }
            }

            if ((user.subscriptionStatus === 'past_due' || user.subscriptionStatus === 'unpaid') && eventData.status === 'active'){

                let newHistory = {
                    startDate:  eventData.current_period_start,
                    endDate:    eventData.current_period_end,
                    email:      subscriptionHistory.email,
                    planId:     subscriptionHistory.planId,
                    planName:   subscriptionHistory.planName,
                    isTrial:    false,
                    currentAutomationCount: 0,
                    order:      subscriptionHistory.order + 1
                }

                let saveNewHistory = await createUserSubscriptionHistory(newHistory);

                user.subscriptionStatus = eventData.status

                user.currentSubscriptionId = saveNewHistory._id

                let updateUser = await user.save()
                return 
            }


        } else {
                // subscription  billing cycle change
            if (eventData.current_period_start !== subscriptionHistory.startDate  && eventData.current_period_end !== subscriptionHistory.endDate){
                
                let newHistory = {
                    startDate:  eventData.current_period_start,
                    endDate:    eventData.current_period_end,
                    email:      subscriptionHistory.email,
                    planId:     subscriptionHistory.planId,
                    planName:   subscriptionHistory.planName,
                    isTrial:    false,
                    maxAutomationCount: subscriptionHistory.maxAutomationCount,
                    order:      subscriptionHistory.order + 1
                }

                let saveNewHistory = await createUserSubscriptionHistory(newHistory);

                user.subscriptionStatus = eventData.status

                user.currentSubscriptionId = saveNewHistory._id

                let updateUser = await user.save()
                return 
            }
        }


    } catch (error) {
        console.log(error);
    }
}
/**
 * Function to listen to all unpaid invoice and storing
 * @param {object} data 
 */
async function customerInvoicePaymentFailed(data){
    try {
        let customer = data.data.object.customer
        let user = await Users.findOne({"stripe.customer.id" : customer});
        if (!user.stripe.invoices.length){
            user.stripe.invoices = []
            user.stripe.invoices.push({
                id : data.data.object.id,
            })
        }

        if (user.stripe.invoices.length){

            user.stripe.invoices.push({
                id : data.data.object.id,
            });

        }

        let updateUser = await user.save();

    } catch (error) {
        
    }
}

async function payUnpaidInvoices(req, res){
    let token = req.headers.authorization || req.body.token
    try {
        let user = await Users.findOne({accessToken : token});
        let totalUnpaidInovice = user.stripe.invoices.length
        if (!totalUnpaidInovice){
            return res.status(400).send({message: `You don't have any pending invoice`, status: false});
        }
        let lastInvoice = user.stripe.invoices[totalUnpaidInovice-1].id;
        
        let chargeInvoice = await finalizeInvoice(lastInvoice);
        user.stripe.invoices = []
        let updateUser = user.save();
        
        return res.status(200).send({message: `Your ready to go`, status: true});
    } catch (error) {
        return res.status(400).send({message : error.message, status : false});
    }
}



module.exports = {
    getAllPlansCtrl,
    updateUserSubscribtion,
    retriveUsersCard,
    addNewCardToUser,
    deleteUserCard,
    usersDefaultCard,
    getUserDefaultCardInfo,
    stripeWebhookEventListener,
    payUnpaidInvoices
}