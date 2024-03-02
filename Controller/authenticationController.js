const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const teachers = require("./../Model/teacher");

exports.login = async (req, res, next) => {
  try {
    if (req.body.email == "lol@gmail.com" && req.body.password == "123") {
      let token = jwt.sign(
        {
          id: 2,
          name: "mohamed hamdy",
          role: "admin",
        },
        "key",
        {
          expiresIn: "5h",
        }
      );

      res.status(200).json({ data: "Authenticated", token });
    } else {
      const obj = await teachers.findOne({ email: req.body.email });
      if (!obj || !(await bcrypt.compare(req.body.password, obj.password))) {
        let error = new Error("Not Authenticated");
        error.status = 401;
        throw error;
      }

      let token = jwt.sign(
        {
          id: obj._id,
          name: obj.fullname,
          role: "teacher",
        },
        "key",
        {
          expiresIn: "5h",
        }
      );

      res.status(200).json({ data: "Authenticated", token });
    }
  } catch (error) {
    next(error);
  }
};
