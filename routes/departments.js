const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment, deleteDepartment, getDepartmentTableData, getSingleDepartmentInfo
} = require("../controllers/departments");

router.route("/:departmentId").get(getSingleDepartmentInfo);
router.route("/:departmentId").delete(deleteDepartment);
router.route("/").post(createDepartment);
router.route("/").get(getDepartmentTableData);


module.exports = router;