const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Tag = sequelize.define(
  "Tag",
  {
    tagname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = Tag;
