/**
 * Running this file will update the users table
 * 
 * Purpose: Earlier all the users who were there in the platform where came via hooks and the suspend hooks change the users to email_suspend. Now this script will clean
 *          that users which is having _suspend at the end. There are duplicate users of that name which will be deleted.
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
  
  collection.find().toArray().then(data=>{
    let stats= {
        found: 0,
        updated: 0,
        deleted: 0
    }
    data.forEach(o=> {
        let suspendEmail = o.email;
        let findSuspend= o.email.search('_suspend');
        if(findSuspend!==-1){
            stats.found +=1
            let email = suspendEmail.slice(0,findSuspend);
            collection.findOneAndUpdate({email : suspendEmail}, {$set : {email : email, isActive: false}},{projection: {email : 1}}).then(updated=>{
                
                stats.updated +=1;
                console.log(stats);
            }).catch(err=>{
                if (err.code === 11000){
                    collection.remove({email : suspendEmail}).then(removed=>{
                       stats.deleted += 1
                       console.log(stats)
                    }).catch(err=>{
                        console.log(err);
                    })
                } else {
                    console.log(err);
                }
            })
        }
    })
  }).catch(err=>{
      client.close();
  })


});