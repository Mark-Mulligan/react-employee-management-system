const express = require("express");
const router = express.Router();

// Controllers
const {
  getRoleTableData, getSingleRoleInfo, createRole
} = require("../controllers/roles");

router.route("/:roleId").get(getSingleRoleInfo);
router.route("/").get(getRoleTableData);
router.route("/").post(createRole);


module.exports = router;