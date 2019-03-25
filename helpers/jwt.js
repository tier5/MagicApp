/** 
 *  NAME : jwt.js
 *  PURPOSE : Helper function for jsonwebtoken
 *  
 */

 var jwt = require('jsonwebtoken');
/**
 * Function to create an access token
 * @param {String} email 
 */
 function createAccessToken(email){
    return jwt.sign({ email},process.env.JWT_SECRET);
 }

 module.exports = {
    createAccessToken
 }