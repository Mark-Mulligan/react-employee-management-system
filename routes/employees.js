const express = require("express");
const router = express.Router();

// Controllers
const {

} = require("../constrollers/employees");

router.route("/:employeeId").get(getSingleRoleInfo);
router.route("/:employeeId").delete(deleteRole);
router.route("/:employeeId").put(updateRole);
router.route("/").get(getRoleTableData);
router.route("/").post(createRole);


module.exports = router;