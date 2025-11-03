const { Sequelize } = require('sequelize');

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD ) {
  console.log("❌ [MariaDB]: File: connect.js | Info: .env is not available");
}

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
