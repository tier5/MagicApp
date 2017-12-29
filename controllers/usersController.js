const Users = require('../models/users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports.createUsers =function(req,res,next){
   const body = req.body;
   Users.create(body).then((data)=>{
    res.status(200).send({
        status:true,
        message:"User have been created"
    });

   }).catch((err)=>{
       let message = err.errors[0].message
    
        res.status(400).send({
            status:false,
            message: message
        });
   })
};

module.exports.getUserById = function(req,res,next){
    let user_id = req.params.id;
    Users.findOne({
        where: {user_id: user_id},
        attributes: [['user_id','id'], 'email','first_name','last_name']
    }).then((data)=>{
        res.status(200).send({
            status:true,
            message:"Fetched the user",
            data:data
        });
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message: err
        });
    })
}

module.exports.deleteUsers = function(req,res,next){
    let user_id = req.params.id; 
    Users.destroy({
        where:{
            user_id:{
                [Op.eq]:user_id 
            }
        }
    }).then(()=> res.status(200).send({
        status:true,
        message:"User Deleted"
    }) ).catch(function(err){
        console.log(err);
        res.status(400).send({
            status:false,
            message: 'Whoops something went wrong!'
        });
    })
}