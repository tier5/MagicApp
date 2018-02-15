/**
 * Name : users.seeder.js
 * Purpose: create an admin for the application
 */
const connection = require('../models/index');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');

var superAdmin = new Users({
    name : 'Super Admin',
    email: 'admin@amagiczap.com',
    password: 123456,
    isAdmin:true,
    userType:'paid',
    zaps:[],
    accessToken:jwt.sign({ email: 'admin@amagiczap'},"amagiczap.com")
});

superAdmin.save().then((doc)=>{
    process.exit(1);
}).catch((err)=>{
    console.log(err);
    process.exit(1);
})

