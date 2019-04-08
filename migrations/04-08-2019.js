/**
 * Running this file will update the users table
 * It will change all the emails in lower case
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require("../config/index.json");

const prodConfig = config.production;
console.log(prodConfig);

const USER = prodConfig.DB_USER;

const PASSWORD = prodConfig.DB_PASS; 
const HOST = prodConfig.DB_HOST;
const DB = "magicAppDb";
const PORT = '27017';

const url = `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`

const opts = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    poolSize: 50,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true,
    useMongoClient: true
  };

  // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db("magicAppDb");
    const collection = db.collection('users');
    if (err){
        console.log(err);
    } else {
        console.log("Connected successfully to server");
        collection.find().forEach(
            function(e) {
              if (e.email !== e.email.toLowerCase()){
                e.email = e.email.toLowerCase();
                 collection.save(e).catch(err=>{
                     console.log("Duplicate Emails" , e.email);
                     //console.log(err);
                     //collection.deleteOne({email : e.email});
                 });
              }
              
            }
          )
    }
})
