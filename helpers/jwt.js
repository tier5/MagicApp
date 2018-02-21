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
    return jwt.sign({ email},"amagiczap.com");
 }

 module.exports = {
    createAccessToken
 }