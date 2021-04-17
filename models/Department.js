const orm = require("../config/orm");

const Department = {
  create: function (departmentObj, errCb, cb) {
    orm.createDepartment(departmentObj, (err) => errCb(err), (result) => {
      cb(result);
    });
  },
};

module.exports = Department;