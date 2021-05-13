const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("./user.service");
const User = require("../models/User");

const verifyPassword = (password) => {
  return true; // todo
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log({ email, password });
      User.findOne({ email }, null, null, (err, user) => {
        console.log({ err, user });
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username." });
        if (!verifyPassword(password))
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializing user...", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializing user...", id);
  User.findById(id, null, null, (err, user) => {
    done(err, user);
  });
});

module.exports = {
  passport,
};
