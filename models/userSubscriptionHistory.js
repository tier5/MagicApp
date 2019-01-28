/**
 * Name : userSubscriptionHistory.js
 * Purpose : Storing user subsciption history and counts of automation and zaps
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator'),
    db = require('./index');


const UserSubscriptionHistroySchema = new Schema({
    startDate : {
        type : Number,
        required: true
    },
    endDate : {
        type: Number,
        required: true
    },
    actualEndDate:{
        type: Number,
    },
    email:{
        type : String,
        required: true,
        trim: true
    },
    planId: {
        type: String,
        required: true,
        trim: true
    },
    planName:{
        type: String,
        required: true,
        trim: true
    },
    isTrial:{
        type: Boolean,
        required: true,
        default: false
    },
    maxAutomationCount: {
        type: Number,
        default: 1000
    },
    currentAutomationCount: {
        type: Number,
        default: 0
    },
    order: {
        type: Number, 
        default: 1,
        required: true
    }
},{
    usePushEach: true,
    timestamps: true
})


const UserSubscriptionHistroy = db.model('users_subscription_history', UserSubscriptionHistroySchema);

module.exports = UserSubscriptionHistroy 


