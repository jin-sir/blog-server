const Tag_Article_mapping = require("../model/Tag_Article_mapping");

exports.addMapping = async function (mappingObj) {
  const result = await Tag_Article_mapping.create(mappingObj);
  return result.toJSON();
};

exports.deleteMapping = async function (BlogArticleId) {
  return await Tag_Article_mapping.destroy({
    where: {
      BlogArticleId,
    },
  });
};

exports.getMappingByTagId = async function (tagId) {
  const result = await Tag_Article_mapping.findAll({
    where: {
      TagId: tagId,
    },
  });
  return JSON.parse(JSON.stringify(result));
};
