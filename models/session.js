/**
 * Name : session.js
 * Purpose : Session model
 */

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const db        = require('./index');

const SessionSchema = new Schema({
    accessToken: {
        type:       String,
        required:   true
    },
    loginAt:{
        type:       Number,
    },
    logoutAt:{
        type:       Number
    }
} , { timestamps: true})

var Session = db.model('sessions', SessionSchema);

module.exports = Session