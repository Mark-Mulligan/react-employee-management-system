const express = require("express");
const router = express.Router();

// Controllers
const { getSingleEmployeeInfo, deleteEmployee, updateEmployee, getEmployeeTableData, createEmployee} = require("../controllers/employees");

router.route("/:employeeId").get(getSingleEmployeeInfo);
router.route("/:employeeId").delete(deleteEmployee);
router.route("/:employeeId").put(updateEmployee);
router.route("/").get(getEmployeeTableData);
router.route("/").post(createEmployee);


module.exports = router;