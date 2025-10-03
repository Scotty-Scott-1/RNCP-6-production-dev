const { Sequelize } = require('sequelize');
require("dotenv").config();
const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


const sequelize = new Sequelize(name, user, password, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
