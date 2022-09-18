const Admin = require("../model/Admin");
const { Op } = require("sequelize");
const md5 = require("md5");

exports.addAdmin = async function (adminObj) {
  adminObj.pwd = md5(adminObj.pwd);
  const result = await Admin.create(adminObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.login = async function (adminObj) {
    const result = await Admin.findOne({
        where: {
            username:adminObj.username,
            pwd: md5(adminObj.pwd)
        }
    })
    if (result) {
        return result.toJSON();
    }
    return result;
};

exports.updateAdmin = async function (adminObj) {
    adminObj.pwd = md5(adminObj.pwd);
    const result = await Admin.update(adminObj, {
        where: {
            username: adminObj.username
        }
    })
    return result;
};
