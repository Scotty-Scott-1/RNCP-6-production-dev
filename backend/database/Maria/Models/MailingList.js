// DB/Models/MailingList.js
const { DataTypes } = require("sequelize");
const sequelize = require('../connect.js');
const User = require("./User.js");

const MailingList = sequelize.define("MailingList", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  listName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" }, onDelete: 'CASCADE' }
}, { timestamps: true });

module.exports = MailingList;
