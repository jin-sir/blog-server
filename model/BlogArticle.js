const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const BlogArticle = sequelize.define(
  "BlogArticle",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    markdownContent: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    toc: {
      type: DataTypes.TEXT("long"),
      allowNull: null,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    allowComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pathName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
module.exports = BlogArticle;
