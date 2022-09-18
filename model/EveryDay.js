const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const EveryDay = sequelize.define(
  "EveryDay",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = EveryDay;