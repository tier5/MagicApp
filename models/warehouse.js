/**
 * Name : warehouse.js
 * Purpose : It's a collection for the user who is either deactivating their account and delecting the account by hooks and all thier data.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index');

const UserWarehouseSchema = new Schema({
    usersCollectionData: {
        type : Object
    },
    email : {
        type: String, required : true
    },
    scriptData:{
        type: Array
    }

} , { timestamps: true})

var  UserWarehouse= db.model('users_warehouse', UserWarehouseSchema);

module.exports = UserWarehouse