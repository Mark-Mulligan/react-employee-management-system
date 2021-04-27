const express = require("express");
const router = express.Router();

// Controllers
const {
  getSingleEmployeeInfo,
  deleteEmployee,
  updateEmployee,
  getEmployees,
  createEmployee,
  employeeBarChartData,
} = require("../controllers/employees");

router.route("/data/chartdata").get(employeeBarChartData);
router.route("/:employeeId").get(getSingleEmployeeInfo);
router.route("/:employeeId").delete(deleteEmployee);
router.route("/:employeeId").put(updateEmployee);
router.route("/").get(getEmployees);
router.route("/").post(createEmployee);

module.exports = router;
