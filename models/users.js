/**
 * Name : users.js
 * Purpose : Users model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const db = require('./index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema =  new Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true, 'Email must be unique'],
        trim: true,
        validate: [{validator: value => validator.isEmail(value), msg : 'Not an email'}],
        lowercase: true
    },
    name:{
        type:String,
        required:[true, 'name is required']
    },
    password:{
        type:String,required:[true, 'Password is required']
    },
    accessToken:{
        type:String,unique:true
    },
    zaps:[
        {
            name:{
                type:String
            },
            magicOption: {
                type:Boolean, default: false
            },
            elementOption: {
                type:Boolean, default: false
            },
            cookieOption: {
                type:Boolean, default: false
            },
            timeoutOption: {
                type: Boolean, default: false
            },
            pageViewCount:{
                type: Number, default:0
            },
            timeout:{
                days:{
                    type : Number, default: 0, min:0
                },
                hours:{
                    type: Number, default:0, min:0
                },
                minutes:{
                    type: Number, default:0, min:0
                }
            },
            zapierTriggerCount:{
                type:Number, default:0
            },
            hooks_url : {type : String},
            params:[
                {
                    field_name:{
                        type:String
                    },
                    validationType :{
                        type:String
                    },
                    field_value : {
                        type:String
                    }
                }
            ],
            element_attributes:[
                {   attribute_name: {
                        type : String
                    },
                    attribute_type:{
                        type: String
                    }
                }
            ]
        }
    ],
    isAdmin:{
        type:Boolean,default:false
    },
    isActive:{
        type:Boolean,default : true
    },
    userType : {
        // free or paid
        type: String, required : true
    },
    isHookedUser: {
        type: Boolean, required: true, default: false
    },
    isSubscribed: {
        type: Boolean, required: true, default: false
    },
    subscriptionStatus:{
        type: String,
        enum: ['trialing', 'active', 'past_due', 'canceled', 'unpaid'], 
    },
    currentSubscriptionId:{
        type: Schema.Types.ObjectId
    },
    stripe:{
        subscription : {
            id : {
                type: String
            }
        },
        plan:{
            id:{
                type:String
            }
        },
        customer:{
            id:{
                type:String
            }
        },
        cards:[
            {
                id:{ type:String  },
                isDefault:{type:Boolean, default: true}
            }
        ]
    },


},{
    usePushEach: true,
    timestamps: true
});

/**
 * Function to hash password before save
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

var User = db.model('Users', UserSchema);

module.exports = User
