const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const personalInfoServ = require("../../service/personalInfoService");

router.get("/getinfo", asyncHandler(async (req, resp, next) => {
    return await personalInfoServ.getInfo();
}))

router.post("/addinfo", asyncHandler(async (req, resp, next) => {
    return await personalInfoServ.addInfo(req.body);
}))

module.exports = router;