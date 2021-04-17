const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment, getDepartmentTableData
} = require("../controllers/departments");

router.route("/").post(createDepartment);
router.route("/").get(getDepartmentTableData);

module.exports = router;