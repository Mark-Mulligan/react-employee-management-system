const Role = require("../models/Role");

exports.createRole = (req, res) => {
  if (req.isAuthenticated()) {
    const { title, salary, departmentId } = req.body;
    const userId = req.user.id;

    Role.create(
      { title, salary, departmentId, userId },
      (err) => res.status(500).json({ success: false, err: err }),
      (result) => res.status(201).json({ success: true, data: result })
    );
  }
};

exports.deleteRole = (req, res) => {
  if (req.isAuthenticated()) {
    const { roleId } = req.params;
    const userId = req.user.id;

    Role.delete(
      { table: "roles", targetId: roleId, userId },
      (err) => res.status(500).json({ success: false, err: err }),
      (result) => res.status(200).json({ success: true, data: result })
    );
  }
};

exports.updateRole = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { roleId } = req.params;
    const { title, salary, departmentId } = req.body;

    Role.update(
      { title, salary, departmentId, roleId, userId },
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

exports.getRoles = (req, res) => {
  if (req.isAuthenticated()) {
    console.log('roles route hit');
    const userId = req.user.id;

    if (JSON.stringify(req.query) === '{}') {
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
    } else {
      const departmentId = req.query.departmentid;
      Role.getRolesInDepartment(
        userId,
        departmentId,
        (err) => {
          console.log(err);
          res.status(500).json({ success: false, err: err });
        },
        (result) => {
          res.status(200).json({ success: true, data: result });
        }
      );
    }
  }
};

exports.roleBarChartData = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;

    Role.getBarChartData(userId, (err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err });
    },
    (result) => {
      console.log(result);
      res.status(200).json({ success: true, data: result });
    })
  }
}

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
