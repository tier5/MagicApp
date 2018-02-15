/**
 * Running this file will update the users table
 * Adding fields stripe,
 * {
 *  stripe: {
 *  customer: {id : stripeCustomerId }
 *  subscription:{id : stripeSubscriptionId , startDate: start_date_of_subscription, endDate: end_date_for_subscription}
 *  plan : {id: stripePlanId}
 *  cards: [{id: stripeCardId, defaultCard: true}]}
 * }
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
  
  collection.updateMany({stripe:null},{$set:{ 
      stripe: {
          customer:{
              id : ''
          },
          subscription: {
              id : '',
              startDate: '',
              endDate:''
          },
          plan:{
              id:''
          },
          cards:[]
      }
  }},function(err, result) {
    console.log("Updated all the documents with stripe object");
    client.close();
  });
  
});
