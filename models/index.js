/**
 * Name : index.js
 * Purpose : Connection to the database and creating a database
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/magicAppDb',{ useMongoClient: true })
  .then(db => console.log('connected to database'))
  .catch(err=> console.log(err))

 module.exports= mongoose