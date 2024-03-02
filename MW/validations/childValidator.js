const { body, query, param } = require("express-validator");

//_id(Number), fullName, age , level (one of PreKG,KG1,KG2), address (city,street and building)

exports.insertOrUpdateChild = [
  body("_id").optional().isInt().withMessage("child id should be int"),
  body("fullname")
    .isString()
    .withMessage("child fullname should be string")
    .isLength({ min: 10 })
    .withMessage("child fullname should be > 10"),
  body("age").isInt().withMessage("child age should be int"),
  body("Level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Child Level should be one of PreKG,KG1,KG2"),
  body("address").isObject().withMessage("child address should be Object"),
  body("address.city")
    .isString()
    .withMessage("child address street should be string"),
  body("address.street")
    .isString()
    .withMessage("child address city should be string"),
  body("address.building")
    .isInt()
    .withMessage("child address building should be int"),
];

exports.checkId = [param("id").isInt().withMessage("child id should be int")];
