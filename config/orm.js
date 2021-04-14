const connection = require("./connection.js");

const orm = {
  findUserByUsername: function (username, cb) {
    const queryString = `SELECT * FROM users WHERE username = ?;`
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
};

module.exports = orm;
