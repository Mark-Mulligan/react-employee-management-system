const express = require("express");
const router = express.Router();

// Controllers
const {
  createDepartment, deleteDepartment, updateDepartment, getDepartmentTableData, getSingleDepartmentInfo
} = require("../controllers/departments");

router.route("/:departmentId").get(getSingleDepartmentInfo);
router.route("/:departmentId").delete(deleteDepartment);
router.route("/:departmentId").put(updateDepartment);
router.route("/").post(createDepartment);
router.route("/").get(getDepartmentTableData);


module.exports = router;