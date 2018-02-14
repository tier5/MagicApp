/** 
 *  NAME : nodemailer.js
 *  PURPOSE : Helper function for nodemailer
 *  
 */
const nodemailer = require('nodemailer');

/** 
 * Function to send mail to the user's email
 * @param {string} email
 * @param {string} token 
 * @param {function} callback
 */
function sendForgetPasswordMail(email,token,callback){
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'work.test.tier5@gmail.com',
                pass: '!Aworker2#' 
            }
        });
        var mailOptions = {
            to: email,
            from: '"Amagiczap" <donotreply@amagiczap.com>',
            subject: 'AMAGICZAP Password Reset',
            text : `Hi,
                    Looks like you'd like to change your Amagiczap password. Please click the following link to do so:

                    http://localhost:8080/reset-password/${token}

                    Please disregard this e-mail if you did not request a password reset.
                    Cheers,
                    Team Amagiczap`
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            callback(err,info);
        });
    });
}

module.exports = {
    sendForgetPasswordMail
}