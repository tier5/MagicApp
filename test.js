// 'use strict';
// const nodemailer = require('nodemailer');

// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'work.test.tier5@gmail.com', // generated ethereal user
//             pass: '!Aworker2#'  // generated ethereal password
//         }
//     });

//     // setup email data with unicode symbols
//     // let mailOptions = {
//     //     from: '"AMAGICZAP" <donotreply@amagiczap.com>', // sender address
//     //     to: 'work@tier5.us', // list of receivers
//     //     subject: 'Hello ✔', // Subject line
//     //     text: 'Hello world?', // plain text body
//     //     html: '<b>Hello world?</b>' // html body
//     // };
//     var mailOptions = {
//         to: 'work@tier5.us',
//         from: '"Amagiczap" <donotreply@amagiczap.com>',
//         subject: 'AMAGICZAP Password Reset',
//         text : `Hi,
//                 Looks like you'd like to change your Amagiczap password. Please click the following link to do so:

//                 https://amagiczap.com/api/reset-password/?token=yqwyeqwyegqwbhgwqgehqwe

//                 Please disregard this e-mail if you did not request a password reset.
//                 Cheers,
//                 Team Amagiczap`
//       };
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });


var stripe = require("stripe")('sk_test_un7R5V4zG4n3bmwoYNbK8ME6');