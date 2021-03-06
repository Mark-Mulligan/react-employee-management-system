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

  delete: function (deleteObj, errCb, cb) {
    orm.deleteOne(
      deleteObj,
      (err) => errCb(err),
      (result) => cb(result)
    );
  },

  update: function (departmentObj, errCb, cb) {
    orm.updateDepartment(
      departmentObj,
      (err) => errCb(err),
      (result) => cb(result)
    );
  },

  getTableData: function (userId, errCb, cb) {
    orm.getDepartmentTableData(
      userId,
      (err) => errCb(err),
      (result) => cb(result)
    );
  },

  getSingleDepartment: function (userId, departmentId, errCb, cb) {
    orm.getSingleDepartment(
      userId,
      departmentId,
      (err) => errCb(err),
      (result) => cb(result)
    );
  },
};

module.exports = Department;
