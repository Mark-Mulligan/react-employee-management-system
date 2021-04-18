const express = require("express");
const router = express.Router();

// Controllers
const {
  getRoleTableData, getSingleRoleInfo, createRole, deleteRole
} = require("../controllers/roles");

router.route("/:roleId").get(getSingleRoleInfo);
router.route("/:roleId").delete(deleteRole);
router.route("/").get(getRoleTableData);
router.route("/").post(createRole);


module.exports = router;