const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const PersonalInfo = sequelize.define(
    "PersonalInfo",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: null
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: null
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: null
        }
    }
)

module.exports = PersonalInfo;


