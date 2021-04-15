const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  getUser
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/user').get(getUser);

module.exports = router;