/**
 * Name : tutorials.js
 * Purpose : Tutorials model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const db = require('./index');

const TutorialsSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    source: {
        type: String,
        required: true
    },
    order:{
        type: Number,
        required: true,
        unique: true
    }
} , { timestamps: true})

var Tutorials = db.model('tutorials', TutorialsSchema);

module.exports = Tutorials