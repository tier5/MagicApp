/*
* Running this file will update the users table;
* Adding fields isActive , isAdmin if these fields are not there; 
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
  
  collection.updateMany({isAdmin:null},{$set:{isAdmin:false}},function(err, result) {
    console.log("Updated all the documents with isAmin field");
  });

  collection.updateMany({isActive:null},{$set:{isActive:false}},function(err, result) {
    console.log("Updated all the documents with isActive field");
    client.close();
  });
});
