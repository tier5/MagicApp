/** 
 *  NAME : nodemailer.js
 *  PURPOSE : Helper function for nodemailer
 *  
 */
const nodemailer = require('nodemailer');
const sendmail = require('sendmail')();

/** 
 * Function to send mail to the user's email
 * @param {string} email
 * @param {string} token 
 * @param {function} callback
 */
function sendForgetPasswordMail(email,token,callback){
    sendmail({
        from: 'Amagiczap <no-reply@amagiczap.com>',
        to: email,
        subject: 'AMAGICZAP Password Reset',
        text: `
                Hi,
                    Looks like you'd like to change your Amagiczap password. Please click the following link to do so:

                    https://www.amagiczap.com/reset-password/${token}

                    Please disregard this e-mail if you did not request a password reset.
                    Cheers,
                    Team Amagiczap
        
        
        `,
      }, function(err, reply) {
        callback(err, reply);
    });
}

module.exports = {
    sendForgetPasswordMail
}