/**
 * Name : magicscripts.js
 * Purpose : magic script model 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('./index');


const magicScriptDataSchema = new Schema({
    domain_name:{type:String,required:true}
})

var magicScriptData = connection.model('magic_script_data', magicScriptDataSchema);

module.exports = magicScriptData

