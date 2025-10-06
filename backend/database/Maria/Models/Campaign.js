const { DataTypes } = require("sequelize");
const sequelize = require('../connect.js');

const Campaign = sequelize.define(
  "Campaign",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    campaignName: { type: DataTypes.STRING, allowNull: false, },
    description: { type: DataTypes.STRING, allowNull: false, },
    startTime: { type: DataTypes.DATE, allowNull: false, },
    endTime: { type: DataTypes.DATE, allowNull: false, },
    mailingListId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'MailingLists', key: 'id', }, onDelete: 'CASCADE' },
    template: { type: DataTypes.STRING, allowNull: false, },
    createdBy: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id', }, onDelete: 'CASCADE' },
    status: { type: DataTypes.STRING, defaultValue: "active", allowNull: false },
    emailsSent: { type: DataTypes.INTEGER, defaultValue: 0, },
    emailsFailed: { type: DataTypes.INTEGER, defaultValue: 0, },
    linksClicked: { type: DataTypes.INTEGER, defaultValue: 0, },
    credentialsSubmitted: { type: DataTypes.INTEGER, defaultValue: 0, },
  }, {
    timestamps: true,
  }
);

module.exports = Campaign;
