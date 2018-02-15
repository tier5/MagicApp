/**
 * Running this file will update the users table
 * Adding fields usersType, default value free
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
  
  collection.updateMany({userType:null},{$set:{usersType:'free'}},function(err, result) {
    console.log("Updated all the documents with userType field");
    client.close();
  });
  
});
