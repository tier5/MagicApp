/**
 * Running this file will update the users table
 * It will clean stripe customer and will create a clean data for the user and plan which will continue to work
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const Plans = require('../config/plans.config');
let planId, planName = 'PROFESSIONAL';
const moment = require('moment');
const {createUserSubscriptionHistory} = require('../controllers/userSubscriptionHistoryController');

let plan = Plans.filter( obj => obj.planName === planName);


if (!plan.length){
    throw new Error('Plan id not found');
    process.exit();
} else {
    planId = plan[0].stripePlanId
}

(async function() {

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'magicAppDb';
    let client;
    let now =moment().unix();
    const nextMonthDate = moment().add(30, 'days').unix()
  
    try {
      client = await MongoClient.connect(url);
      console.log("Connected correctly to server");
  
      const db = client.db(dbName);
  
      // Insert a single document
        let newHistory = {
            startDate:              now,
            endDate:                nextMonthDate,
            planId:                 planId,
            planName:               planName,
            maxAutomationCount:     Infinity,
            currentAutomationCount: 0,
            isTrial:                false
        }
        let Users = db.collection('users');
        let allUsers = await Users.find({ name : 'test'}).toArray();
        let user = allUsers[0]
        
        letNotUpdateUser = []
        allUsers.forEach(async (user )=> {
            try {
                newHistory.email = user.email
                let history = await createUserSubscriptionHistory(newHistory);
                user.isHookedUser = true
                user.isSubscribed = true
                user.currentSubscriptionId = history._id;
                user.subscriptionStatus = 'active';
                user.stripe.customer.id = null
                user.stripe.subscription.id = null
                user.stripe.plan = {
                    id : planId
                }
                user.stripe.cards = []
                user.stripe.invoices = []
                let update = await Users.updateOne({ email : user.email}, { $set : {...user}})
            } catch (error) {
                //console.log(error);
                letNotUpdateUser.push(user.email);
            }
        })
        console.log('notInserted', letNotUpdateUser)
        
       
    } catch (err) {
      console.log(err.stack);
    }
  
    // Close connection
    //client.close();
  })();
