/* 
* Alter Collection users
* Adding a field magicOptions default false to all the zaps created
* Used in zapController -> updateZap , scriptController -> saveScriptData 
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
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('users');

  collection.updateMany({'zaps.magicOption':null},{$set:{'zaps.$[].magicOption':false}},function(err, result) {
    if (!err){
        var data = result?result.result:null
        console.log(data);
        console.log("Updated all the documents with isActive field");
    } else {
        console.log(err);
    }
    client.close();
  });
});