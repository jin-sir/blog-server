const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const blogArticleServ = require("../../service/blogArticleService");

router.get(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticle(req.query.page, req.query.limit);
  })
);

router.get(
  "/:pathname",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleByPathName(req.params.pathname);
  })
);
router.get(
  "/admin/:id",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleById(req.params.id);
  })
);

router.get(
  "/info/hot",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleHot();
  })
);

router.get(
  "/page/search",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleBySearch(req.query.wd,req.query.page,req.query.limit);
  })
);

router.post(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.addArticle(req.body);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.updateArticle(req.params.id, req.body);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.deleteArticle(req.params.id);
  })
);

module.exports = router;
