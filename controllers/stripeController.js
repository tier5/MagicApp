/**
 * Name: stripeController.js
 * Purpose : Stripe Controller
 */
var moment                  = require('moment');
var Users                   = require('../models/users');
var {
        getAllPlans, 
        createCard , 
        createSubscription, 
        updateSubscription,
        retriveCustomerCard}   = require('../helpers/stripe');


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
    Users
        .findOne({accessToken : token})
        .select({email:1, userType: 1, stripe:1, isActive:1,isAdmin:1, accessToken: 1})
        .then(user => {
            createCard(user.stripe.customer.id,req.body.cardToken)
                .then(()=>{
                    user.stripe.card = {
                        id : req.body.card.id
                    }
                    //return createSubscription(user.stripe.customer.id,req.body.plan.id)
                    return updateSubscription(user.stripe.subscription.id,req.body.plan.id)
                })
                .then(sub => {
                   var startDate = new Date ;
                   var endDate = startDate.addDays(365);

                   user.stripe.subscription = {
                       id : user.stripe.subscription.id,
                       startDate :startDate,
                       endDate : moment(endDate).format()
                   }
                   user.stripe.plan={
                       id : req.body.plan.id
                   }
                   user.userType = 'paid';
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
                    res.status(200).send({status: true, message: `Thanks, You're ready to go.`, token:updatedUser.accessToken , user:sendUserData });
                })
                .catch(err=>{
                    res.status(500).send({status: false, message: `Something went wrong`});
                    console.log(err)
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
    Users
        .findOne({accessToken : token })
        .select({stripe: 1})
        .then(user=>{
            let customerId = user.stripe.customer.id;
            return retriveCustomerCard(customerId)
        })
        .then(cards=>{
            res.status(200).send({message: 'Cards', status : true, data: cards.data});
        })
        .catch(err=> console.log(err));
 }


module.exports = {
    getAllPlansCtrl,
    updateUserSubscribtion,
    retriveUsersCard
}