/**
 * Name: stripeController.js
 * Purpose : Stripe Controller
 */
var _                       = require('lodash');
var moment                  = require('moment');
var Users                   = require('../models/users');
const Plans                 = require('../config/plans.config');

var {
        getAllPlans, 
        createCard , 
        createSubscription, 
        updateSubscription,
        retriveCustomerCard,
        createSource,
        defaultSource,
        deleteCard,
        retrieveCustomer, 
        retrieveCard}       = require('../helpers/stripe');


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

 function updateUserSubscribtion(req,res){
    var token = req.headers.authorization;
    let planName = req.body.plan;
    let plan = Plans.filter(obj=> {
        return obj.planName == planName
    });
    if (!plan.length){
        return res.status(400).send({message: 'Wrong plan selected', status: false});
    }
    let planId = plan[0].stripePlanId
    Users
        .findOne({accessToken : token})
        .select({email:1, userType: 1, stripe:1, isActive:1,isAdmin:1, accessToken: 1})
        .then(user => {
            updateSubscription(user.stripe.subscription.id,planId)
                .then(sub => {
                   user.stripe.subscription = {
                       id : user.stripe.subscription.id,
                   }
                   user.stripe.plan={
                       id : planId
                   }
                   return user.save()
                })
                .then(updatedUser=>{
                    var sendUserData = {
                        email : updatedUser.email,
                        name : updatedUser.name,
                        isAdmin: updatedUser.isAdmin,
                        isActive: updatedUser.isActive,
                        isSubscribed : true
                    }
                    return res.status(200).send({status: true, message: `Thanks, You're ready to go.`, token: updatedUser.accessToken , user: sendUserData });
                })
                .catch(err=>{
                    console.log(err)
                    return res.status(500).send({status: false, message: `Something went wrong`});
                })

        })
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
 function addNewCardToUser(req,res){
    var token = req.headers.authorization;
    var cardToken = req.body.cardToken;
    var customerId, thisUser, cardId;
    Users
        .findOne({accessToken: token})
        .select({stripe:1})
        .then(user=>{
            customerId = user.stripe.customer.id;
            thisUser = user;
            return createSource(customerId,cardToken);
        })
        .then(card=>{
            cardId = card.id
            return defaultSource(customerId,cardId)
        })
        .then(confirm=> {
            thisUser.stripe.cards.forEach(card=>{
                card.isDefault = false
            });
            thisUser.stripe.cards.push({ id : cardId, isDefault: true});
            return thisUser.save()
        })
        .then(done=>{
            res.status(200).send({message: 'Card Added',status : true})
        })
        .catch(err=>{
            console.log(err);
            res.status(400).send({message:err.message, status:false});
        })
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



module.exports = {
    getAllPlansCtrl,
    updateUserSubscribtion,
    retriveUsersCard,
    addNewCardToUser,
    deleteUserCard,
    usersDefaultCard,
    getUserDefaultCardInfo
}