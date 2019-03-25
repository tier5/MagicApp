
 /**
 * Name : index.js
 * Purpose : Connection to the database and creating a database
 */
const mongoose = require('mongoose');

    mongoose.Promise = global.Promise;
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASS;
const HOST = process.env.DB_HOST;
const DB = process.env.DB_NAME;
const PORT = process.env.DB_POST || '27017';

const connectionString = `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`

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

mongoose
  .connect(connectionString,opts)
  .then(db => console.log('connected to database'))
  .catch(err=> console.log(err))

 module.exports= mongoose
