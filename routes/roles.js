const express = require("express");
const router = express.Router();

// Controllers
const {
  getRoleTableData
} = require("../controllers/roles");

router.route("/").get(getRoleTableData);

module.exports = router;