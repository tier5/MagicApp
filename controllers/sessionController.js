/**
 * Name: sessionController.js
 * Purpose : Session Controller controls everything for user session
 */

const Sessions = require('../models/session');
const moment   = require('moment');


function nowTimestamp() {
    return moment().unix()
}

async function createSession(accessToken){
    return new Promise(async (resolve, reject)=>{
        try {
            let create = await Sessions.create({ accessToken : accessToken , loginAt : nowTimestamp()})
            return resolve(create);
        } catch (error) {
           return reject(error);
        }
    })
}

async function logOutSession(accessToken){
    return new Promise(async (resolve, reject)=>{
        try {
            let getLastLogin = await Sessions.findOne({accessToken : accessToken}).sort({createdAt: -1});
            if (!Object.keys(getLastLogin)){
                return resolve();
            }
                getLastLogin.logoutAt = nowTimestamp();
            let save = await getLastLogin.save();
            return resolve(save);
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
    createSession,
    logOutSession
}