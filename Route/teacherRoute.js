const express = require("express");
const controller = require("./../Controller/teacherController");
const {
  insertOrUdateTeacher,
  checkId,
} = require("../MW/validations/teacherValidators");
const validator = require("./../MW/validations/validator");
const {
  isAdmin,
  isTeacher,
  isAdminAndTeacher,
} = require("./../MW/Auth/authenticationMW");

const router = express.Router();

router
  .route("/teachers")
  .get(isAdmin, controller.getAllTeachers)
  .post(isAdmin, insertOrUdateTeacher, validator, controller.addTeacher);

router.get("/teachers/supervisors", isAdmin, controller.getClassSupervisors);

router
  .route("/teachers/:id")
  .get(isAdminAndTeacher, validator, controller.getTeacherById)
  .delete(isAdmin, validator, controller.deleteTeacher)
  .patch(
    isAdminAndTeacher,
    insertOrUdateTeacher,
    validator,
    controller.updateTeacher
  );

module.exports = router;
