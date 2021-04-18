const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment, getDepartmentTableData, getSingleDepartmentInfo
} = require("../controllers/departments");

router.route("/:departmentId").get(getSingleDepartmentInfo);
router.route("/").post(createDepartment);
router.route("/").get(getDepartmentTableData);


module.exports = router;