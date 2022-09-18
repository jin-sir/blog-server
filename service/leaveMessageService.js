const LeaveMessage = require("../model/LeaveMessage");
const { Op } = require("sequelize");

exports.addComment = async function (commentObj) {
  const result = await LeaveMessage.create(commentObj);
  return result.toJSON();
};

exports.getComment = async function (page = 1, limit = 5) {
  let stairComment = await LeaveMessage.findAndCountAll({
    where: {
      parent: -1,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "DESC"]]
  });
  stairComment = JSON.parse(JSON.stringify(stairComment));
  const secondaryPromiseArray = stairComment.rows.map((stair) => {
    return LeaveMessage.findAll({
      where: {
        parent: stair.id,
      },
    });
  });
  let secondaryComment = await Promise.all(secondaryPromiseArray);
  secondaryComment = JSON.parse(JSON.stringify(secondaryComment));
  secondaryComment = secondaryComment.filter((item) => item.length);
  return {
    stairComment,
    secondaryComment,
  };
};
