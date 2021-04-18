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

    Department.getTableData(
      userId,
      (err) => {
        console.log(err);
        res.status(500).json({ success: false, err: err })
      },
      (result) => {
        res.status(200).json({ success: true, data: result })
      }
    );
  }
};

exports.getSingleDepartmentInfo = (req, res) => {
  console.log('single department route hit');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { departmentId } = req.params;
    
    console.log(userId);
    console.log(departmentId);

    Department.getSingleDepartment(userId, departmentId, (err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err })
    },
    (result) => {
      console.log('single department result');
      console.log(result);
      res.status(200).json({ success: true, data: result })
    })
  }
}
