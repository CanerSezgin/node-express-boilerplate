const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log({ email, password });
      User.findOne({ email }, null, null, async (err, user) => {
        console.log({ err, user });
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username." });
        const isValidPassword = await bcrypt.compare(password, user.hash)
        if (!isValidPassword)
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
