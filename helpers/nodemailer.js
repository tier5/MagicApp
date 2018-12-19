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
                user: '',
                pass: '' 
            }
        });
        var mailOptions = {
            to: email,
            from: '"Amagiczap" <donotreply@amagiczap.com>',
            subject: 'AMAGICZAP Password Reset',
            text : `Hi,
                    Looks like you'd like to change your Amagiczap password. Please click the following link to do so:

                    https://www.amagiczap.com/reset-password/${token}

                    Please disregard this e-mail if you did not request a password reset.
                    Cheers,
                    Team Amagiczap`
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(error)
            callback(err,info);
        });
    });
}

module.exports = {
    sendForgetPasswordMail
}