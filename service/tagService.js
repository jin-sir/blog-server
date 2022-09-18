const Tag = require("../model/Tag");
const blogArticleServ = require("./blogArticleService");
const tag_Article_mappingServ = require("./tag_Article_mappingService");

exports.addTag = async function (tagObj) {
  const result = await Tag.create(tagObj);
  return result.toJSON();
};

/**
 *
 * @param {*} tagObj
 * tagObj: {
 *  tagname,
 *  oldtagname
 * }
 * @param {*} id
 */
exports.updateTag = async function (id, tagObj) {
  const result = await Tag.update(tagObj, {
    where: {
      id,
    },
  });
  if (result[0]) {
    const articleIdArray = await blogArticleServ.__getArticleIdByTagname(
      tagObj.oldtagname
    );
    const articleUpdate = articleIdArray.map((article) => {
      let tags = JSON.parse(article.tag);
      tags = tags.map((tag) =>
        tag === tagObj.oldtagname ? tagObj.tagname : tag
      );
      return blogArticleServ.updateArticle(article.id, {
        tag: tags,
      });
    });
    const updateResult = await Promise.all(articleUpdate);
    if (updateResult.length) {
      const isSuccess = updateResult.every((item) => item);
      return [+isSuccess];
    } else {
      return result;
    }
  }
  return result;
};

exports.deleteTag = async function (id) {
  const isExist = await tag_Article_mappingServ.getMappingByTagId(id);
  if (isExist.length) {
    return 0;
  }
  return await Tag.destroy({
    where: {
      id,
    },
  });
};

exports.getTagIdByTagName = async function (tagname) {
  const result = await Tag.findOne({
    attributes: ["id"],
    where: {
      tagname,
    },
  });
  return JSON.parse(JSON.stringify(result));
};

exports.getTags = async function () {
  const result = await Tag.findAll({
    attributes: ["id", "tagname"],
  });
  return JSON.parse(JSON.stringify(result));
};

exports.getTagById = async function (id) {
  const result = await Tag.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return result;
}
