const { body, query, param } = require("express-validator");

//_id(objectID), fullname,password, email , image (which is string)

exports.insertOrUdateTeacher = [
  body("_id")
    .optional()
    .isMongoId()
    .withMessage("Teacher id should be Mongo objectId"),
  body("fullname")
    .isString()
    .withMessage("Teacher fullname should be string")
    .isLength({ min: 10 })
    .withMessage("Teacher fullname should be > 10"),
  body("password")
    .isString()
    .withMessage("Teacher password should be string")
    .isLength({ min: 8 })
    .withMessage("Teacher password should be > 8"),
  body("email")
    .isString()
    .withMessage("Teacher email should be string")
    .isEmail()
    .withMessage("Teacher email should be Email"),
  body("image").isString().withMessage("Teacher image should be string"),
];

exports.checkId = [param("id").isInt().withMessage("teacher id should be int")];
