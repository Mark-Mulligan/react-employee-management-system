const orm = require("../config/orm");

const User = {
  create: function (username, password, cb) {
    orm.createUser(username, password, (result) => {
      cb(result);
    });
  },

  findOne: function (username, cb) {
    orm.findUserByUsername(username, (result) => {
      cb(result);
    });
  },
};

module.exports = User;
