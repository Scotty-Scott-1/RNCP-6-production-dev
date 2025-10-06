// dbInit.js
const sequelize = require('../Maria/connect.js');
const User = require("./Models/User.js");
const MailingList = require("./Models/MailingList.js");
const Campaign = require("./Models/Campaign.js");
const Contact = require("./Models/Contact.js");

// Associations

// User -> MailingLists
User.hasMany(MailingList, { foreignKey: "createdBy", onDelete: "CASCADE" });
MailingList.belongsTo(User, { foreignKey: "createdBy" });

// User -> Campaigns
User.hasMany(Campaign, { foreignKey: "createdBy", onDelete: "CASCADE" });
Campaign.belongsTo(User, { foreignKey: "createdBy" }); // no cascade needed, handled by hasMany

// MailingList -> Campaigns
MailingList.hasMany(Campaign, { foreignKey: "mailingListId", onDelete: "CASCADE" });
Campaign.belongsTo(MailingList, { foreignKey: "mailingListId" }); // no cascade needed, handled by hasMany

// MailingList -> Contacts
MailingList.hasMany(Contact, { foreignKey: "mailingListId", onDelete: "CASCADE" });
Contact.belongsTo(MailingList, { foreignKey: "mailingListId" }); // no cascade needed




async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('MariaDB: Connection established successfully!');

    // Sync all models
    await User.sync({ alter: true });
    await MailingList.sync({ alter: true });
    await Campaign.sync({ alter: true });
    await Contact.sync({ alter: true });
    console.log('MariaDB: All models synchronized successfully.');

  } catch (err) {
    console.error('MariaDB: Unable to connect to the database:', err);
  }
}

module.exports = initDB;
