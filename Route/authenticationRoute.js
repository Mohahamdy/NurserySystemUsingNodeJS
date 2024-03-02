const express = require("express");
const controller = require("./../Controller/authenticationController");
const router = express.Router();

router.post("/login", controller.login);

module.exports = router;
