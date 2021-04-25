const path = require("path");
const router = require("express").Router();

// If no API routes are hit, send the React app

router.use("/api/auth", require("./auth"));
router.use("/api/departments", require("./departments"));
router.use("/api/roles", require("./roles"));
router.use("/api/employees", require("./employees"));

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;