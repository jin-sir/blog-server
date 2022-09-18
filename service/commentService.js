const Comment = require("../model/Comment");

exports.addComment = async function (commentObj) {
  const result = await Comment.create(commentObj);
  return result.toJSON();
};

exports.getComment = async function (articleId, page = 1, limit = 5) {
  let stairComment = await Comment.findAndCountAll({
    where: {
      BlogArticleId: articleId,
      parent: -1,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [["createdAt", "desc"]]
  });
  stairComment = JSON.parse(JSON.stringify(stairComment));
  const secondaryPromiseArray = stairComment.rows.map((stair) => {
    return Comment.findAll({
      where: {
        BlogArticleId: articleId,
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
