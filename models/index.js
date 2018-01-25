var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/magicAppDb',{ useMongoClient: true }).then((db)=>{
    console.log('Connected to db')
  }).catch((err)=>{
    console.log(err);
  })
 module.exports= mongoose