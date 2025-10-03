// dbInit.js
const sequelize = require('../Maria/connect.js');
const MDB_User = require('../Maria/Models/User.js');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('MariaDB: Connection established successfully!');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('MariaDB: All models synchronized successfully.');

  } catch (err) {
    console.error('MariaDB: Unable to connect to the database:', err);
  }
}

module.exports = initDB;
