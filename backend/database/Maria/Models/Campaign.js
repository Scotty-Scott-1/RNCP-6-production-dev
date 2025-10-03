const { DataTypes } = require("sequelize");
const sequelize = require('../connect.js');

const Campaign = sequelize.define(
  "Campaign",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mailingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    emailsSent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    emailsFailed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    linksClicked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    credentialsSubmitted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Campaign;
