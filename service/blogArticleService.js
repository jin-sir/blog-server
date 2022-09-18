const BlogArticle = require("../model/BlogArticle");
const tag_Article_mappingServ = require("./tag_Article_mappingService");
const tagServ = require("./tagService");
const { Op } = require("sequelize");

exports.addArticle = async function (articleObj) {
  articleObj.tag = JSON.stringify(articleObj.tag);
  articleObj.views = 0;
  const ins = await BlogArticle.create(articleObj);
  const insId = ins.toJSON().id;
  const tags = JSON.parse(articleObj.tag);
  const tagIdPromise = tags.map((item) => tagServ.getTagIdByTagName(item));
  const tagId = await Promise.all(tagIdPromise);
  const mappingPromise = tagId.map((item) =>
    insertTagArticleMapping(item.id, insId)
  );
  const mapping = await Promise.all(mappingPromise);
  return ins.toJSON();
};

/**
 * 将文章和标签映射到另一张表
 * @param {Number} tag
 * @param {Number} insid
 */
async function insertTagArticleMapping(tag, insid) {
  return await tag_Article_mappingServ.addMapping({
    TagId: tag,
    BlogArticleId: insid,
  });
}

exports.updateArticle = async function (id, articleObj) {
  articleObj.tag = JSON.stringify(articleObj.tag);
  return await BlogArticle.update(articleObj, {
    where: {
      id,
    },
  });
};

exports.deleteArticle = async function (id) {
  return await BlogArticle.destroy({
    where: {
      id,
    },
  });
};

exports.getArticleById = async function (id) {
  const result = await BlogArticle.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.getArticleHot = async function () {
  const result = await BlogArticle.findAndCountAll({
    offset: 0,
    limit: 8,
    attributes: [
      "id",
      "title",
      "pathName",
      "summary",
      "tag",
      "views",
      "createdAt",
    ],
    order: [["views", "DESC"]],
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};
/**
 * 根据搜索获取文章
 * @param {*} wd
 * @param {*} page
 * @param {*} limit
 */
exports.getArticleBySearch = async function (wd, page, limit) {
  const result = await BlogArticle.findAndCountAll({
    offset: (page - 1) * limit,
    limit: +limit,
    attributes: [
      "id",
      "title",
      "pathName",
      "summary",
      "tag",
      "views",
      "createdAt",
    ],
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${wd}%`,
          },
        },
        {
          markdownContent: {
            [Op.like]: `%${wd}%`,
          },
        },
      ],
    },
    order: [["createdAt", "DESC"]],
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};

/**
 * 获取文章的路径和标题
 */
exports.getArticleTitle = async function () {
  const result = await BlogArticle.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "pathName", "title"],
    offset: 0,
    limit: 50,
  });
  return JSON.parse(JSON.stringify(result));
};

/**
 * 通过path路径获取某篇文章内容 √
 * @param {String} pathName
 */
exports.getArticleByPathName = async function (pathName) {
  let result = await BlogArticle.findOne({
    attributes: [
      "id",
      "title",
      "toc",
      "content",
      "summary",
      "tag",
      "createdAt",
      "updatedAt",
      "allowComment",
      "views",
    ],
    where: {
      pathName,
    },
  });
  if (result) {
    result = result.toJSON();
    result.tag = JSON.parse(result.tag);
    const views = result.views + 1;
    exports.updateArticle(result.id, { views });
    return result;
  }
  return result;
};

/**
 * 用分页形式获取文章列表 √
 * @param {Number} page
 * @param {Number} limit
 */
exports.getArticle = async function (page = 1, limit = 12) {
  const result = await BlogArticle.findAndCountAll({
    offset: (page - 1) * limit,
    limit: +limit,
    attributes: [
      "id",
      "title",
      "pathName",
      "summary",
      "tag",
      "views",
      "createdAt",
    ],
    order: [["views", "DESC"]],
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};

/**
 * 获取标签下的文章，分页 √
 * @param {String} tagname
 */

exports.getArticleByTag = async function (tagname) {
  const articleDatas = await _getTagHasArticleCount(tagname);
  return articleDatas;
};

exports.__getArticleIdByTagname = async function (tagname) {
  const result = await BlogArticle.findAll({
    where: {
      tag: {
        [Op.like]: `%"${tagname}"%`,
      },
    },
    attributes: ["id", "tag"],
  });
  return JSON.parse(JSON.stringify(result));
};

/**
 * 统计所有标签下有多少篇文章，返回一个数组 √
 */
exports.getArtcileCountOnTag = async function () {
  const tags = await tagServ.getTags();
  const tagsPromise = tags.map((tag) => _getTagHasArticleCount(tag.tagname));
  const tagsTotal = await Promise.all(tagsPromise);
  return tagsTotal;
};

/**
 * 内置方法
 * 统计一个标签下有多少篇文章，返回一个对象 √
 * @param {String} tagname
 */
async function _getTagHasArticleCount(tagname, page = 1, limit = 12) {
  const result = await BlogArticle.findAndCountAll({
    offset: (page - 1) * limit,
    limit: +limit,
    where: {
      tag: {
        [Op.like]: `%"${tagname}"%`,
      },
    },
    attributes: ["id", "title", "pathName", "summary", "views", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
  return {
    tag: tagname,
    count: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
}
