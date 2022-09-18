const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const LeaveMessage = sequelize.define(
  "LeaveMessage",
  {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emall: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = LeaveMessage;
