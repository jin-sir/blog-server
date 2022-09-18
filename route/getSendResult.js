exports.getErr = (err = "server internal error", errCode = 500) => {
  if (err === "Validation error") {
    err = "文章路径已存在，换个路径试试吧~~";
  }
  return {
    code: errCode,
    msg: err,
  };
};

exports.getSendResult = (result) => {
  return {
    code: 0,
    msg: "",
    data: result,
  };
};

exports.asyncHandler = (handler) => {
  return async (req, resp, next) => {
    try {
      const result = await handler(req, resp, next);
      resp.send(exports.getSendResult(result));
    } catch (err) {
      next(err);
    }
  };
};
