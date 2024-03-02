const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];

    let decodedToken = jwt.verify(token, "key");
    req.token = decodedToken;
    //console.log(req.token.role);
    next();
  } catch (error) {
    error.message = "not Authenticated";
    error.status = 401;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.token.role == "admin") next();
  else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role == "teacher") next();
  else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdminAndTeacher = (req, res, next) => {
  if (req.token.role == "teacher" || req.token.role == "admin") next();
  else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
