const connection = require("./connection.js");

const orm = {
  findUserByUsername: function (username, cb) {
    const queryString = `SELECT * FROM users WHERE username = ?;`;
    connection.query(
      queryString,
      [username],
      (err, result) => {
        if (err) throw err;
        else {
          return cb(result);
        }
      }
    );
  },

  findUserById: function(userId, cb) {
    const queryString = `SELECT * FROM users WHERE id = ?;`;
    connection.query(queryString, [userId], (err, result) => {
      if (err) throw err;
      else {
        return cb(result);
      }
    })
  },

  createUser: function (username, password, errCb, cb) {
    const queryString = `INSERT INTO users (username, password) VALUES (?, ?);`;
    connection.query(queryString, [username, password], (err, result) => {
      if (err) {
        return errCb(err)
      }
      else {
        return cb(result);
      }
    })
  },

  createDepartment: function (departmentObj, errCb, cb) {
    const { departmentName, userId } = departmentObj;

    const queryString = `INSERT INTO departments (name, user_id) Values (?, ?);`;
    connection.query(queryString, [departmentName, userId ], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        cb(result);
      }
    })
  },

  createRole: function (roleObj, errCb, cb) {
    const { title, salary, departmentId, userId } = roleObj;

    const queryString = `INSERT INTO roles (title, salary, department_id, user_id) Values (?, ?, ?, ?);`;
    connection.query(queryString, [title, salary, departmentId, userId ], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        cb(result);
      }
    })
  },

  createEmployee: function (employeeObj, errCb, cb) {
    const { firstName, lastName, roleId, managerId, dateHired, userId } = employeeObj;

    const queryString = `INSERT INTO employees (first_name, last_name, role_id, manager_id, date_hired, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(queryString, [firstName, lastName, roleId, managerId, dateHired, userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    })
  }
};

module.exports = orm;
