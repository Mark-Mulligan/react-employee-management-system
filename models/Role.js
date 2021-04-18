const orm = require("../config/orm");

const Role = {
  getTableData: function (userId, errCb, cb) {
    orm.getRoleTableData(
      userId,
      (err) => errCb(err),
      (result) => {
        cb(result);
      }
    );
  },

  getSingleRole: function (userId, roleId, errCb, cb) {
    orm.getSingleRole(
      userId,
      roleId,
      (err) => errCb(err),
      (result) => {
        cb(result);
      }
    );
  },
};

module.exports = Role;
