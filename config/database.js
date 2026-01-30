// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library_db', 'root', 'Mnbvcxz123.', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


module.exports = sequelize;