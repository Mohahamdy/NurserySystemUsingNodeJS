const express = require("express");

const controller = require("./../Controller/childConroller");
const {
  insertOrUpdateChild,
  checkId,
} = require("./../MW/validations/childValidator");
const validator = require("./../MW/validations/validator");
const {
  isAdmin,
  isTeacher,
  isAdminAndTeacher,
} = require("./../MW/Auth/authenticationMW");

const router = express.Router();

router
  .route("/child")
  .get(isAdmin, controller.getAllChildren)
  .post(isAdmin, insertOrUpdateChild, validator, controller.addChild);

router
  .route("/child/:id")
  .get(isAdminAndTeacher, checkId, validator, controller.getChildById)
  .delete(isAdminAndTeacher, checkId, validator, controller.deleteChild)
  .put(
    isAdminAndTeacher,
    insertOrUpdateChild,
    validator,
    controller.updateChild
  );
module.exports = router;
