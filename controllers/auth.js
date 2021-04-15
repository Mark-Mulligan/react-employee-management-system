const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.create(username, password, (user) => {
    res.status(201).json({ success: true, data: user });
  });
}

