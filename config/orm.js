const connection = require("./connection.js");

const orm = {
  /* Generic actions */
  deleteOne: function (deleteObj, errCb, cb) {
    const { table, targetId, userId } = deleteObj;
    console.log(table, targetId, userId);
    const queryString = `DELETE FROM ${table} where id = ? and user_id = ?;`;

    connection.query(queryString, [targetId, userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  /* User Actions */
  findUserByUsername: function (username, cb) {
    const queryString = `SELECT * FROM users WHERE username = ?;`;
    connection.query(queryString, [username], (err, result) => {
      if (err) throw err;
      else {
        return cb(result);
      }
    });
  },

  findUserById: function (userId, cb) {
    const queryString = `SELECT * FROM users WHERE id = ?;`;
    connection.query(queryString, [userId], (err, result) => {
      if (err) throw err;
      else {
        return cb(result);
      }
    });
  },

  createUser: function (username, password, errCb, cb) {
    const queryString = `INSERT INTO users (username, password) VALUES (?, ?);`;
    connection.query(queryString, [username, password], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  /* Department Actions */
  createDepartment: function (departmentObj, errCb, cb) {
    const { departmentName, userId } = departmentObj;

    const queryString = `INSERT INTO departments (name, user_id) Values (?, ?);`;
    connection.query(queryString, [departmentName, userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        cb(result);
      }
    });
  },

  updateDepartment: function (departmentObj, errCb, cb) {
    const { departmentName, departmentId, userId } = departmentObj;
    const queryString = `UPDATE departments SET name = ? WHERE id = ? AND user_id = ?;`;
    connection.query(
      queryString,
      [departmentName, departmentId, userId],
      (err, result) => {
        if (err) {
          return errCb(err);
        } else {
          return cb(result);
        }
      }
    );
  },

  getSingleDepartment: function (userId, departmentId, errCb, cb) {
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

  /* Role Actions */
  createRole: function (roleObj, errCb, cb) {
    const { title, salary, departmentId, userId } = roleObj;

    const queryString = `INSERT INTO roles (title, salary, department_id, user_id) Values (?, ?, ?, ?);`;
    connection.query(
      queryString,
      [title, salary, departmentId, userId],
      (err, result) => {
        if (err) {
          return errCb(err);
        } else {
          cb(result);
        }
      }
    );
  },

  updateRole: function (RoleObj, errCb, cb) {
    const { title, salary, departmentId, roleId, userId } = RoleObj;
    const queryString = `UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ? AND user_id = ?;`;
    connection.query(
      queryString,
      [title, salary, departmentId, roleId, userId],
      (err, result) => {
        if (err) {
          return errCb(err);
        } else {
          return cb(result);
        }
      }
    );
  },

  getRoleTableData: function (userId, errCb, cb) {
    const queryString = `Select roles.id, title, salary, departments.name as department from roles 
        join departments where roles.department_id = departments.id AND roles.user_id = ?`;

    connection.query(queryString, [userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  getSingleRole: function (userId, roleId, errCb, cb) {
    const queryString = `SELECT roles.id, roles.title, roles.salary, 
    departments.name, departments.id as department_id, count(employees.id) as employees, sum(roles.salary) as roleUtilization
    from roles left join employees on (roles.id = employees.role_id)
    left join departments on (roles.department_id = departments.id)
    WHERE roles.user_id = ?
    group by roles.id having roles.id = ?;`;

    connection.query(queryString, [userId, roleId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  /* Employee Actions */
  createEmployee: function (employeeObj, errCb, cb) {
    const {
      firstName,
      lastName,
      roleId,
      managerId,
      dateHired,
      userId,
    } = employeeObj;

    const queryString = `INSERT INTO employees (first_name, last_name, role_id, manager_id, date_hired, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(
      queryString,
      [firstName, lastName, roleId, managerId, dateHired, userId],
      (err, result) => {
        if (err) {
          return errCb(err);
        } else {
          return cb(result);
        }
      }
    );
  },

  updateEmployee: function (employeeObj, errCb, cb) {
    const {
      firstName,
      lastName,
      roleId,
      managerId,
      dateHired,
      employeeId,
      userId,
    } = employeeObj;
    const queryString = `UPDATE roles SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?, date_hired = ? 
    WHERE id = ? AND user_id = ?;`;
    connection.query(
      queryString,
      [firstName, lastName, roleId, managerId, dateHired, employeeId, userId],
      (err, result) => {
        if (err) {
          return errCb(err);
        } else {
          return cb(result);
        }
      }
    );
  },

  getSingleEmployee: function (id, errCb, cb) {
    const queryString = `Select a.id, a.first_name, a.last_name, roles.title, roles.id as role_id, departments.id as department_id, 
        departments.name as department, roles.salary, a.manager_id, CONCAT(b.first_name, ' ', b.last_name) as manager
        FROM employees a join roles on a.role_id = roles.id 
        join departments on roles.department_id = departments.id
        left join employees b on b.id = a.manager_id or a.manager_id = null
        WHERE a.id = ${id}`;

    connection.query(queryString, (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  },

  getEmployeeTableData: function (userId, errCb, cb) {
    const queryString = `Select a.id, a.first_name, a.last_name, roles.title, 
    departments.name as department, roles.salary, CONCAT(b.first_name, ' ', b.last_name) as manager, a.date_hired
    FROM employees a join roles on a.role_id = roles.id 
    join departments on roles.department_id = departments.id
    left join employees b on b.id = a.manager_id or a.manager_id = null
    join users on a.user_id = users.id
    where users.id = ?;`;

    connection.query(queryString, [userId], (err, result) => {
      if (err) {
        return errCb(err);
      } else {
        return cb(result);
      }
    });
  }


};

module.exports = orm;
