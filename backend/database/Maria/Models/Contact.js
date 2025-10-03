// DB/Models/Contact.js
const { DataTypes } = require("sequelize");
const sequelize = require('../connect.js');
const MailingList = require("./MailingList.js");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  mailingListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MailingList,
      key: "id"
    }
  }
}, { timestamps: true });

module.exports = Contact;
