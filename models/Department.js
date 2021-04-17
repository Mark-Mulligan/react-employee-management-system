const orm = require("../config/orm");

const Department = {
  create: function (departmentObj, errCb, cb) {
    orm.createDepartment(
      departmentObj,
      (err) => errCb(err),
      (result) => {
        cb(result);
      }
    );
  },

  getTableData: function (userId, errCb, cb) {
    orm.getDepartmentTableData(
      userId,
      (err) => errCb(err),
      (result) => cb(result)
    );
  },
};

module.exports = Department;
