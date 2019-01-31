/**
 * Name: authController.js
 * Purpose : Authentication controller
 */
const Users                                 = require('../models/users');
const bcrypt                                = require('bcrypt');
const moment                                = require('moment');
const { createCustomer, 
        createSubscription, 
        retriveSubscription, 
        preAuthCharge }                     = require('../helpers/stripe');
const { sendForgetPasswordMail }            = require('../helpers/nodemailer.js');
const { createAccessToken }                 = require('../helpers/jwt');
const jwt                                   = require('jsonwebtoken');
const PLANS                                 = require('../config/plans.config');
const {createUserSubscriptionHistory}       = require('./userSubscriptionHistoryController');

/**
 * function to register a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
async function userRegister(req, res, next) {
    var body = req.body;
    body.userType = 'paid'  // always have to pay to use the application
    body.stripe = {};
    let starterPlan = PLANS.filter(o => o.planName == 'STARTER')
    if (starterPlan.length) {
        body.stripe.plan = {
            id: starterPlan[0].stripePlanId
        };
    } else {
        return res.status(500).send({ status: false, message: 'Something went wrong with plans' });
    }

    body.stripe.cards = [];
    // creating an object to store card details
    var card = {
        id: body.card.id,
        isDefault: true
    }
    body.stripe.cards.push(card);

    body.isSubscribed = true
    try {

        let customer = await createCustomer(body.email, body.cardToken);
        let charge = await preAuthCharge(2700, "usd", customer.id);
        body.stripe.customer = {
            id: customer.id
        }
        let subscription = await createSubscription(body.stripe.customer.id, body.stripe.plan.id);
        //console.log('subs',subscription);
        body.stripe.subscription = {
            id: subscription.id,
        };
        body.isHookedUser = false
        body.isSubscribed = true
        body.subscriptionStatus = subscription.status
        body.accessToken = createAccessToken(body.email);
        

        let newCustomerHistory = {
            startDate:subscription.current_period_start,
            endDate:subscription.current_period_end,
            email: body.email,
            planId: body.stripe.plan.id,
            planName: starterPlan[0].planName,
            isTrial: true,
        }
        let newHistory = await createUserSubscriptionHistory(newCustomerHistory)

        body.currentSubscriptionId = newHistory._id;

        var newUser = new Users(body);
        let user = await newUser.save();

        

        var sendUserData = {
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            isSubscribed: true,
            userType: user.userType,
            isHookedUser: user.isHookedUser,
            subscriptionStatus: user.subscriptionStatus
        }
        return res.status(200).send({ status: true, message: "User created", token: user.accessToken, user: sendUserData })

    } catch (error) {

        if (body.stripe.customer) {

            let deleteCustomer = await deleteCustomer(body.stripe.customer.id);
        }
        return res.status(400).send({ status: false, message: error.message });
    }
}

/**
 * function to login a user
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns response 
 */
async function userLogin(req, res, next) {
    var { email, password } = req.body;

    try {
        var user = await Users.findOne({ email }).select({ 
                                                            email: 1, 
                                                            password: 1, 
                                                            stripe: 1, 
                                                            isActive: 1, 
                                                            isAdmin: 1, 
                                                            userType: 1, 
                                                            accessToken: 1, 
                                                            userType: 1, 
                                                            name: 1, 
                                                            isSubscribed: 1, 
                                                            isHookedUser : 1,
                                                            subscriptionStatus: 1});

        if (!user) { return res.status(400).send({ message: 'User not exists', status: false }) }

        var decoded = await bcrypt.compare(password, user.password);

        if (decoded) {
            var sendUserData = {
                email:              user.email,
                name:               user.name,
                isAdmin:            user.isAdmin,
                isActive:           user.isActive,
                userType:           user.userType,
                isSubscribed:       user.isSubscribed,
                isHookedUser:       user.isHookedUser,
                subscriptionStatus: user.subscriptionStatus
            }
            if (user.userType == 'free') {

                sendUserData.isSubscribed = true;

            }
            return res.status(200).send({ status: true, message: "success", token: user.accessToken, user: sendUserData })

        } else {

            return res.status(400).send({ status: false, message: "Either password or email is wrong!" })
        }

    } catch (error) {

        // console.log(error);

        return res.status(500).send({ status: false, message: error.message })
    }
}

/**
 * Function for user's forget password
 * @param {object} req
 * @param {object} res
 */
function userForgetPassword(req, res) {
    var email = req.body.email;
    Users
        .findOne({ email })
        .select({ email: 1 })
        .then(user => {
            if (!user) { return res.status(500).send({ message: 'Email not exists!', status: false }); }
            var resetToken = jwt.sign({ email: user.email }, "amagiczap.com", { expiresIn: 60 * 60 });
            sendForgetPasswordMail(email, resetToken, function (err, info) {
                if (!err) {
                    res.status(200).send({ message: 'An email has been sent to reset password', status: true });
                } else {
                    res.status(500).send({ message: 'Something went wrong!', status: false });
                }
            })
        })
        .catch(err => {
            //console.log(err);
            res.status(500).send({ message: 'Something went wrong!', status: false });
        })
}
/**
 * Function for users's reset password
 * @param {object} req 
 * @param {object} res
 */
function userResetPassword(req, res) {
    var token = req.headers.authorization || req.params.token;
    var password = req.body.password;
    jwt.verify(token, 'amagiczap.com', function (err, decoded) {
        if (!err) {
            Users
                .findOne({ email: decoded.email })
                .select({ password: 1 })
                .then(user => {
                    user.password = password;
                    return user.save()
                })
                .then(docs => {
                    return res.status(200).send({ message: 'Password updated', status: true })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ message: 'Something went wrong', status: false })
                })
        } else {
            console.log(err);
            res.status(400).send({ message: 'Something went wrong', status: false })
        }

    });
}
/**
 * Function to update user's password
 * @param {object} req 
 * @param {object} res
 */
function userUpdatePassword(req, res) {
    var token = req.headers.authorization || req.params.token;
    var password = req.body.password;
    if (!password || !token) {
        return res.status(400).send({ message: 'Bad Request', status: false });
    };
    Users
        .findOne({ accessToken: token })
        .select({ password: 1 })
        .then(user => {
            if (!user) {
                return res.status(400).send({ message: 'Bad Request', status: false });
            }
            user.password = password;
            return user.save()
        })
        .then(docs => {
            return res.status(200).send({ message: 'Password updated', status: true });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ message: 'Something went wrong', status: false });
        })
}

async function getUserPrimaryData(req, res, next) {
    try {
        var token = req.headers.authorization
        var user = await Users.findOne({ accessToken: token }).select({ 
                    email: 1, 
                    isActive: 1, 
                    isAdmin: 1, 
                    userType: 1, 
                    accessToken: 1, 
                    name: 1, 
                    isSubscribed: 1, 
                    isHookedUser: 1, 
                    subscriptionStatus: 1});
        if (!user) {
            return res.status(404).send({ message: 'Not Found', status: false });
        }

        var sendUserData = {
            email:              user.email,
            name:               user.name,
            isAdmin:            user.isAdmin,
            isActive:           user.isActive,
            userType:           user.userType,
            isSubscribed:       user.isSubscribed,
            subscriptionStatus: user.subscriptionStatus,
            isHookedUser:       user.isHookedUser
        }
        if (user.userType == 'free') {

            sendUserData.isSubscribed = true;
        }
        return res.status(200).send({ status: true, message: "success", token: user.accessToken, user: sendUserData })
    } catch (error) {
        return res.status(500).send({ status: false, message: "something went wrong", token: user.accessToken, user: sendUserData })
    }
}

async function checkEmailExists(req, res) {
    let email = req.body.email;
    try {
        let isFound = await Users.findOne({ email: email });
        if (isFound) {
            return res.status(400).send({ status: false, message: 'Email Exists', data: { email: email } })
        } else {
            return res.status(200).send({ status: true, message: 'Email does not exists', data: { email: email } })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Something Went Wrong' });
    }
}

module.exports = {
    userRegister,
    userLogin,
    userForgetPassword,
    userResetPassword,
    userUpdatePassword,
    getUserPrimaryData,
    checkEmailExists
}