const Department = require("../models/Department");

exports.createDepartment = (req, res) => {
  if (req.isAuthenticated()) {
    const { departmentName } = req.body;
    const userId = req.user.id;

    Department.create(
      { departmentName, userId },
      (err) => res.status(500).json({ success: false, err: err }),
      (result) => res.status(201).json({ success: true, data: result })
    );
  }
};

exports.getDepartmentTableData = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    console.log('getDepartmentTableData');
    console.log(userId);

    Department.getTableData(
      userId,
      (err) => {
        console.log(err);
        res.status(500).json({ success: false, err: err })
      },
      (result) => {
        console.log(result);
        res.status(200).json({ success: true, data: result })
      }
    );
  }
};
