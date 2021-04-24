const orm = require("../config/orm");

const Employee = {
  create: function (employeeObj, errCb, cb) {
    orm.createEmployee(
      employeeObj,
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
      (result) => {
        cb(result);
      }
    );
  },

  update: function (employeeObj, errCb, cb) {
    orm.updateEmployee(
      employeeObj,
      (err) => errCb(err),
      (result) => {
        cb(result);
      }
    );
  },

  getTableData: function (userId, errCb, cb) {
    orm.getEmployeeTableData(
      userId,
      (err) => errCb(err),
      (result) => {
        cb(result);
      }
    );
  },

  /* Need to fix this in orm */
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

module.exports = Employee;