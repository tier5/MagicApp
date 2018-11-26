/**
 * Running this file will update the users table
 * Adding field timeout if these fields are not there
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'magicAppDb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const collection = db.collection('users');
  
  collection.updateMany({'zaps.timeout':null},{$set:{'zaps.$.timeout':{ hours : 0, minutes : 0 , days : 0}}},function(err, result) {
      if (!err){
        console.log("Updated all the documents with Time field");
      } else {
        console.log(err)
      }
      //client.close();
  });

  collection.updateMany({'zaps.timeoutOption':null},{$set:{'zaps.$.timeoutOption': false}},function(err, result) {
    if (!err){
      console.log("Updated all the documents with Time field");
    } else {
      console.log(err)
    }
    client.close();
  });

});
