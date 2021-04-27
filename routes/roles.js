const express = require("express");
const router = express.Router();

// Controllers
const {
  getRoles, getSingleRoleInfo, createRole, deleteRole, updateRole, roleBarChartData
} = require("../controllers/roles");

router.route("/data/chartdata").get(roleBarChartData);
router.route("/:roleId").get(getSingleRoleInfo);
router.route("/:roleId").delete(deleteRole);
router.route("/:roleId").put(updateRole);
router.route("/").get(getRoles);
router.route("/").post(createRole);


module.exports = router;