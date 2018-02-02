var stripe_key = process.env.stripe_key;
var stripe = require("stripe")(
    "sk_test_un7R5V4zG4n3bmwoYNbK8ME6"
  );

  function createCustomer(email){
      if (email){
        return new Promise((resolve,reject)=>{
            stripe.customers.create({
                description: 'Customer for amagiczap application',
                // source: "tok_amex" // obtained with Stripe.js
                email : email
              }, function(err, customer) {
                // asynchronously called
                if(!err){
                    resolve(customer);
                } else {
                    reject(err);
                }
              });
        })
      }
  }

  function getAllPlans(){
    return new Promise ((resolve,reject)=>{
        stripe.plans.list(
            { },
            function(err, plans) {
              // asynchronously called
                if (!err) {
                    resolve(plans)
                } else {
                    reject(err)
                }
            }
          );
    })
  }

module.exports = {
    createCustomer,
    getAllPlans
}