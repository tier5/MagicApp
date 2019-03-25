/**
 * Name : config.js
 * Purpose : Set all the variables which are in index.json to process.env only in development mode
 */
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./index.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

if (env === 'production' ){
    var config = require('./index.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}