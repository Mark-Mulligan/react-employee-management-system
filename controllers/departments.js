const Department = require("../models/Department");

exports.createDepartment = (req, res) => {
  if (req.isAuthenticated()) {
    const { departmentName } = req.body;
    const userId = req.user.id;

    Department.create(
      { departmentName, userId },
      (err) => res.status(500).json({ success: false, err: err}),
      (result) => res.status(201).json({ success: true, data: result }),
    );
  }
};
