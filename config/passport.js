const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne(username, (user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username. '});
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(err);
          if (result) done(null, user);
          else done(null, false, { message: 'Incorrect password'}); 
        })
      })
    }
  ));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  })

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    })
  })
}