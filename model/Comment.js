const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Comment = sequelize.define("Comment", {
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
});

module.exports = Comment;
