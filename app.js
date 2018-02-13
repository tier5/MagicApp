/**
 * -----------------------------------------------------------------
 * Node, Express, Mongodb and Vuejs Application 
 * -----------------------------------------------------------------
 * NAME : app.js
 * PURPOSE : Application Boostrap
 */

// Module Loading 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');

// create an instance of the application 
var app = express();

// Required config and model setup
require('./config/config');
require('./models/index');
require('dotenv').config();

// Routes of the application 
var appRoutes = require('./routes/index');

/** 
 * Middleware
 */
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '/public/frontend/dist')));
  app.use(cors())
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","*")
    next();
  })
  app.use('/api',appRoutes);
  app.use(helmet());
  app.disable('x-powered-by');

// send all get request to frontend to handle  
  app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/frontend/dist/index.html'))
  });

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = 'Not Found'
    next(err);
  });
//error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });

module.exports = app;
