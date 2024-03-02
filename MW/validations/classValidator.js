const { body, param } = require("express-validator");
//_id(Number), name, supervisor (teacher id number), children which is array of children ids

exports.insertOrUpdateClass = [
  body("_id").optional().isInt().withMessage("class id should be int"),
  body("name").isString().withMessage("class name should be string"),
  body("supervisor")
    .isMongoId()
    .withMessage("class supervisor should be mongoid"),
  body("children")
    .isArray(Int32Array)
    .withMessage("class children should be array of ints"),
];

exports.checkId = [param("id").isInt().withMessage("id should be int")];
