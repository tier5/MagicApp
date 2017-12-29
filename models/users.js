const mongoose = require('./index');
const Schema = mongoose.Schema;
const validator = require('validator');
const db = require('./index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const UserSchema =  new Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email is unique'],
        trim: true,
    },
    first_name:{
        type:String,required:[true,'First Name is required']
    },
    last_name:{
        type:String,required:[true, 'Last Name is required']
    },
    password:{
        type:String,required:[true, 'Password is required']
    },
    accessToken:{
        type:String
    }

});

UserSchema.pre('save', function (next) {
    var user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.accessToken = jwt.sign({ email: user.email },"TEST");
          next();
        });
      });
    } else {
      next();
    }
  });

var User = db.model('Users', UserSchema);

module.exports = User