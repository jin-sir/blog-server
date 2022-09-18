const PersonalInfo = require("../model/PersonInfo");

/**
 * 获取个人信息
 */
exports.getInfo = async function () {
    const result = await PersonalInfo.findOne({
        attributes:[
            "title",
            "username",
            "profession",
            "description"
        ],
        order: [["createdAt", "DESC"]],
    })
    return JSON.parse(JSON.stringify(result));
}


/**
 * 添加个人信息
 * @param {*} info 
 */
exports.addInfo = async function (info) {
    const result = await PersonalInfo.create(info)
    return result.toJSON();
}