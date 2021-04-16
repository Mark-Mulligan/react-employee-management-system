const Department = require("../models/Department");

exports.createDepartment = (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    console.log('department route hit');
  }
}