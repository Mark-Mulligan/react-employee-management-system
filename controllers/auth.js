const User = require("../models/User");

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.create(
    username,
    password,
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

exports.login = (req, res) => {
  console.log(req.body);
};
