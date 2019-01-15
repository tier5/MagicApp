/**
 * Running this file will update the users table
 * Adding fields isHookedUser if these fields are not there
 * Purpose: Earlier all the users who were there in the platform where came via hooks and checking on hooks
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
  
  collection.updateMany({'isHookedUser': null },{$set:{ 'isHookedUser': true}},function(err, result) {
      if (!err){
        console.log("Updated all the documents with isHookedUser field");
      } else {
        console.log(err)
      }
      client.close();
  });

  collection.updateMany({'isSubscribed': null },{$set:{ 'isSubscribed': true}},function(err, result) {
    if (!err){
      console.log("Updated all the documents with isSubscribed field");
    } else {
      console.log(err)
    }
    client.close();
});

});
