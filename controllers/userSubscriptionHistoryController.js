/**
 * Name: userSubscribtionHistory.js
 * Purpose : User subscription history controller
 */

const UserSubscriptionHistory   = require('../models/userSubscriptionHistory');
const Plans                     = require('../config/plans.config');
const moment                    = require('moment');



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
            if(planName === 'STANDARD') {
                newCustomerHistory.maxAutomationCount = 10000
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

/**
 * Function to check if a user has exhausted the limit of automation count or subscription is active
 * @param {string} id 
 * @param {Boolean} isHookedUser 
 */
async function checkCounterAllowed(id, isHookedUser) { 
    return new Promise(async (resolve, reject) => {
        try {
            let history = await getUserSubscriptionHistoryById(id);
            let now = Date.now();
            let nextMonthDate = moment().add(30, 'days').unix()
            if (history) {

                let isSubscriptionOver = moment(now).isSameOrAfter(history.endDate);

                if(!isSubscriptionOver) {
                    // subscription is over

                    if (isHookedUser) {
                        
                        let newHistory = {
                            startDate:              now,
                            endDate:                nextMonthDate,
                            email:                  history.email,
                            planId:                 history.planId,
                            planName:               history.planName,
                            order:                  history.order + 1,
                            maxAutomationCount:     history.maxAutomationCount,
                            currentAutomationCount: 0,
                            isTrial:                false
                        }

                        if (isSubscriptionOver.isTrial){
                            newHistory.currentAutomationCount = isSubscriptionOver.currentAutomationCount
                        }

                        let createNewHistory = await createUserSubscriptionHistory(newHistory);
                        return resolve({data : createNewHistory, message: 'hooked guys are updated'});

                    } else {
                        return reject({message: 'Subscription date exceeded from current date'})
                    }
                    
                } else {

                    if (history.currentAutomationCount < history.maxAutomationCount) {
                        
                        return resolve({data : historyUpdated, message: 'hooked guys are updated'});

                    } else {    
                        // max zap triggered for the month
                        return reject({message: 'Maximum automation reached, wait for renewal'})
                    }
                }
            }
        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * Function to update the currentAutomationCount counter
 * @param { string } id 
 */
async function updateCurrentAutomationCount(id) {
    try {
        let increment = await UserSubscriptionHistory.updateOne({_id : id}, {$inc : { currentAutomationCount : 1}}, {});    
    } catch (error) {
        console.log(error)
    }
    
}

async function removeUserHistory(email){
    return UserSubscriptionHistory.remove(email);
}



module.exports = {
    createUserSubscriptionHistory,
    changeUserSubscriptionHistory,
    getUserSubscriptionHistoryById,
    checkCounterAllowed,
    updateCurrentAutomationCount,
    removeUserHistory
}