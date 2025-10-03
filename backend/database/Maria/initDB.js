// dbInit.js
const sequelize = require('../Maria/connect.js');
const User = require("./Models/User.js");
const MailingList = require("./Models/MailingList.js");
const Contact = require("./Models/Contact.js");

// Associations
User.hasMany(MailingList, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
  hooks: true
});
MailingList.belongsTo(User, { foreignKey: "createdBy" });

MailingList.hasMany(Contact, {
  foreignKey: "mailingListId",
  onDelete: "CASCADE",
  hooks: true
});
Contact.belongsTo(MailingList, { foreignKey: "mailingListId" });

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
