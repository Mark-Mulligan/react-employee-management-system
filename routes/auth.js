const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  getUser,
  logout
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/user').get(getUser);
router.route("/logout").get(logout);

module.exports = router;