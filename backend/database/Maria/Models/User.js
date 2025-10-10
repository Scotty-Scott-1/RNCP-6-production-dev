const { DataTypes } = require("sequelize");
const sequelize = require('../connect.js');
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    agree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mfaSecret: {
      type: DataTypes.STRING,
      allowNull: true, // user may not enable MFA yet
    },
    mfaEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
  }
);

// instance method for checking password
User.prototype.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = User;
