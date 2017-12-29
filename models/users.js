const Sequelize = require('sequelize');
const db = require('./index');
const bycrpt = require('bcrypt');

const Users = db.define('users', {
    user_id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull:false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull:false,
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull:false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    email_verified:{
        type:Sequelize.BOOLEAN,
        defaultValue:0
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull:false,
    },
    avatar_url:{type: Sequelize.STRING(400)}

});
Users.sync({force:true}).then(()=>{
    console.log('Table is created');

}).catch((err)=>{
    console.log('err in creating table');
});

module.exports= Users
