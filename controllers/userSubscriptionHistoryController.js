/**
 * Name: userSubscribtionHistory.js
 * Purpose : User subscription history controller
 */

const UserSubscriptionHistory   = require('../models/userSubscriptionHistory');
const Plans                     = require('../config/plans.config');



async function createUserSubscriptionHistory(data){
    let newHistory = new UserSubscriptionHistory(data)
    return newHistory.save();
}

async function changeUserSubscriptionHistory(subscription, user, planName, planId){
    return new Promise(async (resolve, reject)=>{
        try {

            let userCurrentHistory = await UserSubscriptionHistory.findById(user.currentSubscriptionId);

            let newCustomerHistory = {
                startDate:  subscription.current_period_start,
                endDate:    subscription.current_period_end,
                email:      user.email,
                planId:     planId,
                planName:   planName,
                isTrial:    false,
                order:      userCurrentHistory.order + 1
            }
            if(planName === 'PROFESSIONAL'){
                newCustomerHistory.maxAutomationCount = 10**10**10
            }
            let newHistory =  new UserSubscriptionHistory(newCustomerHistory);
            let saveNewHistory =  await newHistory.save();

            user.currentSubscriptionId = saveNewHistory._id;
            user.stripe.plan.id = planId
            user.subscriptionStatus = subscription.status
            user.isSubscribed = true

            let updatedUser = await user.save();
            return resolve(updatedUser);

        } catch (error) {
            return reject(error)
        }
    })  
}

async function getUserSubscriptionHistoryById(id){
    
    return UserSubscriptionHistory.findById(id);
}


module.exports= {
    createUserSubscriptionHistory,
    changeUserSubscriptionHistory,
    getUserSubscriptionHistoryById
}