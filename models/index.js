var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ninjaDev:!Aworker2#@ds141454.mlab.com:41454/magicappdb').then((db)=>{
    console.log('Connected to db')
  }).catch((err)=>{
    console.log(err);
  })
 module.exports= mongoose