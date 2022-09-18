const BlogArticle = require("./BlogArticle");
const Tag = require("./Tag");
const Comment = require("./Comment");
const Tag_Article_mapping = require("./Tag_Article_mapping");

BlogArticle.hasMany(Comment);
Comment.belongsTo(BlogArticle);

BlogArticle.hasMany(Tag_Article_mapping);
Tag_Article_mapping.belongsTo(BlogArticle);

Tag.hasMany(Tag_Article_mapping);
Tag_Article_mapping.belongsTo(Tag);
