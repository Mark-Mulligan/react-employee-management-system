const Employee = require("../models/Employee");

exports.createEmployee = (req, res) => {
  if (req.isAuthenticated()) {
    const { firstName, lastName, roleId, managerId, dateHired } = req.body;
    const userId = req.user.id;

    Employee.create(
      { firstName, lastName, roleId, managerId, dateHired, userId },
      (err) => res.status(500).json({ success: false, err: err }),
      (result) => res.status(201).json({ success: true, data: result })
    );
  }
};

exports.deleteEmployee = (req, res) => {
  if (req.isAuthenticated()) {
    const { employeeId } = req.params;
    const userId = req.user.id;

    Employee.delete(
      { table: "employees", targetId: employeeId, userId },
      (err) => res.status(500).json({ success: false, err: err }),
      (result) => res.status(200).json({ success: true, data: result })
    );
  }
};

exports.updateEmployee = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { employeeId } = req.params;
    const { firstName, lastName, roleId, managerId, dateHired } = req.body;

    Employee.update({ firstName, lastName, roleId, managerId, dateHired, userId, employeeId }, (err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err });
    },
    (result) => {
      res.status(200).json({ success: true, data: result });
    })
  }
};

exports.getRoleTableData = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;

    Role.getTableData(
      userId,
      (err) => {
        console.log(err);
        res.status(500).json({ success: false, err: err });
      },
      (result) => {
        res.status(200).json({ success: true, data: result });
      }
    );
  }
};

exports.getSingleRoleInfo = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { roleId } = req.params;

    Role.getSingleRole(
      userId,
      roleId,
      (err) => {
        console.log(err);
        res.status(500).json({ success: false, err: err });
      },
      (result) => {
        console.log(result);
        res.status(200).json({ success: true, data: result });
      }
    );
  }
};
