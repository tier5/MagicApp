var stripe_key = process.env.stripe_key;
var stripe = require("stripe")(
    "sk_test_un7R5V4zG4n3bmwoYNbK8ME6"
  );

  function createCustomer(body , usertype){
    var user = {
        description : 'Customer for amagiczap application',
        email : body.email
    };
    // if the user type is paid then a card token must be present to create a customer 
    if (usertype =='paid'){
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
                //console.log(err);
            }
          }
          );
    })
  }

  function createCharge(cardToken,customerId,amount,currency){
    //   console.log('amount',amount);
    //   console.log('currency',currency);
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

  function deleteCustomer(customerId){
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

module.exports = {
    createCustomer,
    getAllPlans,
    createSubscription,
    createCharge,
    deleteCustomer
}