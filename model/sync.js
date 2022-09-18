require("./BlogArticle");
require("./Tag");
require("./Comment");
require("./EveryDay");
require("./LeaveMessage");
require("./Admin");
require("./PersonInfo");
const sequelize = require("./db");

sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
