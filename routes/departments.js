const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment, getDepartmentTableData, getSingleDepartmentInfo
} = require("../controllers/departments");

router.route("/").post(createDepartment);
router.route("/").get(getDepartmentTableData);
router.route("/:id").get(getSingleDepartmentInfo);

module.exports = router;