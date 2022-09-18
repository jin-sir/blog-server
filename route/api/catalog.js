const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const blogArticleServ = require("../../service/blogArticleService");

router.get(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await blogArticleServ.getArticleTitle();
  })
);

module.exports = router;
