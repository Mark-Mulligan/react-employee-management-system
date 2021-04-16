const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment
} = require("../controllers/departments");

router.route("/").post(createDepartment);

module.exports = router;