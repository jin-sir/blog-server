const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const leaveMessageServ = require("../../service/leaveMessageService");

router.get(
  "/:page",
  asyncHandler(async (req, resp, next) => {
    return await leaveMessageServ.getComment(req.params.page);
  })
);

router.post(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await leaveMessageServ.addComment(req.body);
  })
);

module.exports = router;
