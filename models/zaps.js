/**
 * Name : zaps.js
 * Purpose : script model 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('./index');


const scriptDataSchema = new Schema({
    location:{type:String,required:true},
    zapId:{type:String,required:true},
    params:[
        {
            field_name:{
                type:String
            },
            field_value:{
                type:String
            }
        }
    ]
})

var scriptData = connection.model('script_data', scriptDataSchema);

module.exports = scriptData

