const adminServ = require("../../service/adminService");
const express = require("express");
const { asyncHandler } = require("../getSendResult");
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await adminServ.login(req.body);
  })
);
router.post(
    "/add",
    asyncHandler(async (req, resp, next) => {
      return await adminServ.addAdmin(req.body);
    })
  );

router.put(
  "/",
  asyncHandler(async (req, resp, next) => {
    return await adminServ.updateAdmin(req.body);
  })
);

module.exports = router;
