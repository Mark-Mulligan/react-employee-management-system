const Role = require("../models/Role");

exports.getRoleTableData = (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;

    Role.getTableData(userId,
      (err) => {
        console.log(err);
        res.status(500).json({ success: false, err: err });
      },
      (result) => {
        res.status(200).json({ success: true, data: result });
      })
  }
}