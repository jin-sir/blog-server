const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const commentServ = require("../../service/commentService");

router.get(
  "/:id/:page",
  asyncHandler(async (req, resp, next) => {
    return await commentServ.getComment(req.params.id, req.params.page);
  })
);

router.post(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await commentServ.addComment(req.body);
  })
);

module.exports = router;
