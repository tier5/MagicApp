/** 
 *  NAME : stripe.js
 *  PURPOSE : All stripe related process 
 *  API REFERENCE : https://stripe.com/docs/api
 */

var stripeKey = process.env.STRIPE_KEY;
var stripe = require("stripe")(stripeKey);

/**
 * Function for creating customer in stripe
 * @param {object} email
 * @param {string} cardToken payment card token
 * @returns Promise
 */
function createCustomer(email, cardToken) {
    var user = {
        description: 'Customer for amagiczap application',
        email: email,
        source: cardToken
    };
    return new Promise((resolve, reject) => {
        stripe.customers.create(user, function (err, customer) {
            // asynchronously called
            if (!err) {
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
function getAllPlans() {
    return new Promise((resolve, reject) => {
        stripe.plans.list(
            {},
            function (err, plans) {
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
function createSubscription(customerId, planId) {
    return new Promise((resolve, reject) => {
        stripe.subscriptions.create({
            customer: customerId,
            trial_from_plan: true,
            items: [
                {
                    plan: planId,
                },
            ]
        }, function (err, subscription) {
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
function createCharge(cardToken, customerId, amount, currency) {

    return new Promise((resolve, reject) => {
        stripe.charges.create({
            amount: amount,
            currency: currency,
            customer: customerId
        }, function (err, charge) {
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
    return new Promise((resolve, reject) => {
        stripe.customers.del(
            customerId,
            function (err, confirmation) {
                // asynchronously called
                if (!err) {
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
function retrieveCustomer(customerId) {
    return new Promise((resolve, reject) => {
        stripe.customers.retrieve(
            customerId,
            function (err, confirmation) {
                // asynchronously called
                if (!err) {
                    resolve(confirmation)
                } else {
                    reject(err)
                }
            }
        );
    })
}
/**
 * Function to create a card for the customer
 * @param {string} customerId 
 * @param {string} cardToken 
 */
function createCard(customerId, cardToken) {
    return new Promise((resolve, reject) => {
        stripe.customers.createSource(
            customerId,
            { source: cardToken },
            function (err, card) {
                // asynchronously called
                if (!err) {
                    resolve(card)
                } else {
                    reject(err)
                }
            }
        );
    })
}
/**
 * Function to update the subscription 
 * @param {string} subscriptionId 
 * @param {string} planId 
 */
function updateSubscription(subscriptionId, planId) {
    return new Promise((resolve, reject) => {
        stripe.subscriptions.retrieve(subscriptionId, function (err, subscription) {
            if (!err) {
                stripe.subscriptions.update(subscriptionId, {
                    items: [{
                        id: subscription.items.data[0].id,
                        plan: planId,
                    }]
                }, function (err, sub) {
                    // asynchronously called
                    if (!err) {
                        resolve(sub)
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject(err)
            }
        });
    });
};

/**
 * Function to retrive Subscriptions
 * @param {Object} subscriptionId 
 */
function retriveSubscription(subscriptionId) {
    return new Promise((resolve, reject) => {
        stripe.subscriptions.retrieve(subscriptionId, function (err, subscription) {
            if (!err) {
                resolve(subscription);
            } else {
                reject(err);
            };
        });

    });
};

/**
 * Function to retrive customer's cards 
 * @param {String} custometId
 * @param {String} cardId
 * @returns Promise 
 */
function retriveCustomerCard(customerId) {
    return new Promise((resolve, reject) => {
        stripe.customers.listCards(customerId, function (err, cards) {
            // asynchronously called
            if (!err) {
                resolve(cards);
            } else {
                reject(err);
            };
        });
    });
};
/**
 * Function To create source for the existing customer
 * @param {String} customerId 
 * @param {String} cardToken 
 * @returns PROMISE 
 */
function createSource(customerId, cardToken) {
    return new Promise((resolve, reject) => {
        stripe.customers.createSource(customerId, {
            source: cardToken
        }, function (err, source) {
            if (!err) {
                resolve(source);
            } else {
                reject(err);
            }
        });
    });
};

/**
 * Function to change the default source of the existing customer
 * @param {String} customerId 
 * @param {String} cardToken 
 * @returns PROMISE 
 */
function defaultSource(customerId, cardId) {
    return new Promise((resolve, reject) => {
        stripe.customers.update(customerId, {
            default_source: cardId
        }, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

/**
 * Function to delete a card of existing customer
 * @param {String} customerId 
 * @param {String} cardId 
 * @returns PROMISE 
 */

function deleteCard(customerId, cardId) {
    return new Promise((resolve, reject) => {
        stripe.customers.deleteCard(customerId, cardId, function (err, confirmation) {
            if (!err) {
                resolve(confirmation);
            } else {
                reject(err);
            }
        });
    })
};
/**
 * Function to create card token 
 * 
 */
function demoCardToken() {
    return stripe.tokens.create({
        card: {
            "number": '4242424242424242',
            "exp_month": 12,
            "exp_year": 2019,
            "cvc": '123'
        }
    });
};
/**
 * Function to pre Auth the user card  
 * @param {number} amount 
 * @param {string} currency 
 * @param {string} customerId 
 */
function preAuthCharge(amount, currency, customerId) {
    return new Promise((resolve, reject) => {
        stripe.charges.create({
            amount: amount,
            currency: currency,
            customer: customerId,
            capture: false
        }, function (err, charge) {
            console.log(charge);
            if (err) {
                return reject(err)
            } else {
                return resolve(charge)
            }
        })
    })
}

module.exports = {
    createCustomer,
    getAllPlans,
    createSubscription,
    createCharge,
    deleteCustomer,
    retrieveCustomer,
    createCard,
    updateSubscription,
    retriveSubscription,
    retriveCustomerCard,
    createSource,
    defaultSource,
    deleteCard,
    demoCardToken,
    preAuthCharge
}