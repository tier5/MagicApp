const Sequelize = require('sequelize');
const Users = require('./users');
const { DB_NAME, DB_USER,DB_PASS,DB_HOST } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  //Users(sequelize,Sequelize);
