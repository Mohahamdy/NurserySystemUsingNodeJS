const express = require("express");

const controller = require("./../Controller/classController");
const {
  insertOrUpdateClass,
  checkId,
} = require("./../MW/validations/classValidator");
const validator = require("./../MW/validations/validator");
const {
  isAdmin,
  isTeacher,
  isAdminAndTeacher,
} = require("./../MW/Auth/authenticationMW");

const router = express.Router();

router
  .route("/class")
  .get(isTeacher, controller.getAllClasses)
  .post(isAdminAndTeacher, insertOrUpdateClass, validator, controller.addClass);

router
  .route("/class/:id")
  .get(isAdmin, checkId, validator, controller.getClassById)
  .delete(isAdmin, checkId, validator, controller.deleteClass)
  .put(
    isAdminAndTeacher,
    insertOrUpdateClass,
    validator,
    controller.updateClass
  );

router.get(
  "/class/child/:id",
  isAdminAndTeacher,
  checkId,
  validator,
  controller.getClassChildren
);

router.get(
  "/class/teacher/:id",
  isTeacher,
  checkId,
  validator,
  controller.getClassSupervisor
);

module.exports = router;
