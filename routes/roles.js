const express = require("express");
const router = express.Router();

// Controllers
const {
  getRoleTableData, getSingleRoleInfo
} = require("../controllers/roles");

router.route("/:roleId").get(getSingleRoleInfo);
router.route("/").get(getRoleTableData);


module.exports = router;