const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const blogArticleServ = require("../../service/blogArticleService");
const tagServ = require("../../service/tagService");

router.get(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await tagServ.getTags();
  })
);
router.get(
  "/:tagname",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleByTag(req.params.tagname, req.query.page);
  })
);
router.get(
  "/admin/:id",
  asyncHandler(async (req, resp, next) => {
    return await tagServ.getTagById(req.params.id);
  })
);

router.post(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await tagServ.addTag(req.body);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, resp, next) => {
    return await tagServ.updateTag(req.params.id, req.body);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, resp, next) => {
    return await tagServ.deleteTag(req.params.id);
  })
);

module.exports = router;
