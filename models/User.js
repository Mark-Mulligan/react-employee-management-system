const orm = require("../config/orm");

const User = {
  create: function (username, password, errCb, cb) {
    orm.createUser(username, password, (err) => errCb(err), (result) => {
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
