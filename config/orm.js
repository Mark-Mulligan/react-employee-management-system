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
  }, 

  getDepartmentTableData: function (userId, errCb, cb) {
    const queryString = `SELECT departments.id, departments.name, 
    count(employees.id) as employees, 
    count(distinct roles.id) as roles, 
    SUM(roles.salary) as departmentUtilization       
    from departments
    left join roles
    on (roles.department_id = departments.id)
    left join employees
    on (employees.role_id = roles.id)
    where departments.user_id = ?
    group by
        departments.id;`;

    connection.query(queryString, [userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  getSingleDepartment: function (userId, departmentId, cb, errCb) {
    const queryString = `SELECT departments.id, departments.name, 
    count(employees.id) as employees, 
    count(distinct roles.id) as roles, 
    SUM(roles.salary) as departmentUtilization       
    from departments
    left join roles
    on (roles.department_id = departments.id)
    left join employees
    on (employees.role_id = roles.id)
    where departments.user_id = ?
    group by
        departments.id
	  having departments.id = ?;`;

    connection.query(queryString, [userId, departmentId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },
};

module.exports = orm;
