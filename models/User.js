const orm = require("../config/orm");

const User = {
  findOne: function(username, cb) {
    orm.findUserByUsername(username, result => {
      cb(result)
    })
  }
}

module.exports = User;