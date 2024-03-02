const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  let result = validationResult(req);

  if (result.errors.length > 0) {
    let msg = result.errors.reduce((ele, obj) => ele + obj.msg + " , ", "");
    let error = new Error(msg);
    error.status = 422;
    next(error);
  } else next();
};
