/** 
 *  NAME : stripe.js
 *  PURPOSE : All stripe related process 
 *  API REFERENCE : https://stripe.com/docs/api
 */

var stripeKey = process.env.STRIPE_KEY;
var stripe = require("stripe")(stripeKey);

/**
 * Function for creating customer in stripe
 * @param {object} body
 * @param {string} userType free or paid
 * @returns Promise
 */
function createCustomer(body, userType){
    var user = {
        description : 'Customer for amagiczap application',
        email : body.email
    };
    // if the user type is paid then a card token must be present to create a customer 
    if (userType =='paid'){
        user.source = body.cardToken;
    };
    return new Promise((resolve,reject)=>{
        stripe.customers.create(user, function(err, customer) {
            // asynchronously called
            if(!err){
                resolve(customer);
                //console.log(customer)
            } else {
                reject(err);
                console.log(err)
            }
        });
    })
}

/**
 * Function for get all the plans from stripe 
 * @param nill
 * @returns Promise
 */
function getAllPlans(){
    return new Promise ((resolve,reject)=>{
        stripe.plans.list(
            { },
            function(err, plans) {
            // asynchronously called
                if (!err) {
                    resolve(plans)
                    //console.log(plans)
                } else {
                    reject(err)
                    console.log(err)
                }
            }
        );
    })
}

/**
 * Function for create subscription in stripe 
 * @param {string} customerId
 * @param {string} planId
 * @returns Promise
 */
function createSubscription(customerId,planId){
    return new Promise ((resolve,reject)=>{
        stripe.subscriptions.create({
            customer: customerId,
            items: [
            {
                plan: planId,
            },
            ]
        }, function(err, subscription) {
            if (!err) {
                resolve(subscription)
                //console.log(subscription);
            } else {
                reject(err)
                console.log(err);
            }
        }
        );
    })
}
/**
 * Function for create charge in stripe 
 * @param {string} cardToken
 * @param {string} customerId
 * @param {number} amount
 * @param {string} currency
 * @returns Promise
 */
function createCharge(cardToken,customerId,amount,currency){

    return new Promise((resolve,reject)=>{
        stripe.charges.create({
            amount: amount,
            currency: currency,
            customer: customerId
        }, function(err, charge) {
            // asynchronously called
            if (!err) {
                resolve(charge)
                //console.log(charge)
            } else {
                reject(err)
                //console.log(err)
            }
        });
    })
}
/**
 * Function to delete customer in stripe 
 * @param {string} customerId
 * @returns Promise
 */
function deleteCustomer(customerId) {
    return new Promise((resolve,reject)=>{
        stripe.customers.del(
        customerId,
        function(err, confirmation) {
            // asynchronously called
            if(!err){
            resolve(confirmation)
            } else {
            reject(err)
            }
        }
        );
    })
}
/**
 * Function to retrieve customer in stripe 
 * @param {string} customerId
 * @returns Promise
 */
function retrieveCustomer (customerId){
    return new Promise((resolve,reject)=>{
        stripe.customers.retrieve(
        customerId,
        function(err, confirmation) {
            // asynchronously called
            if(!err){
            resolve(confirmation)
            } else {
            reject(err)
            }
        }
        );
    })
}

module.exports = {
    createCustomer,
    getAllPlans,
    createSubscription,
    createCharge,
    deleteCustomer,
    retrieveCustomer
}