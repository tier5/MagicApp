/** 
 *  NAME : nodemailer.js
 *  PURPOSE : Helper function for nodemailer
 *  API REFERENCE : https://stripe.com/docs/api
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
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'work.test.tier5@gmail.com', // generated ethereal user
                pass: '!Aworker2#'  // generated ethereal password
            }
        });
        var mailOptions = {
            to: email,
            from: '"Amagiczap" <donotreply@amagiczap.com>',
            subject: 'AMAGICZAP Password Reset',
            text : `Hi,
                    Looks like you'd like to change your Amagiczap password. Please click the following link to do so:

                    https://localhost:8080/reset-password/?token=${token}

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