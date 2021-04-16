const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create(
    username,
    hashedPassword,
    (err) => {
      if (err.errno === 1062) {
        res.status(409).json({ success: false, message: 'Username already exsists.' });
      } else {
        res.status(500).json({ success: false, message: 'There was an error creating the user. Please try again.' });
      }
    },
    (user) => {
      res.status(201).json({ success: true, data: user });
    }
  );
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(401).json({ success: false, message: 'Incorrect Credentials'});
    else {
      req.login(user, error => {
        if (error) throw error;
        res.json({ success: true, data: user});
      })
    }
  })(req, res, next)
}

exports.getUser = (req, res) => {
  console.log('user route hit');
  console.log(req.isAuthenticated());
  res.send(req.user);
}

exports.logout = (req, res) => {
  req.logout();
  res.json({ success: true, message: 'You have been logged out' });
}