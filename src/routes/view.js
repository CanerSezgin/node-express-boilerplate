const router = require("express").Router();
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

router.get("/", (req, res) => {
  console.log(JSON.stringify({
    isAuth: req.isAuthenticated(),
    user: req.user,
    sesId: req.sessionID,
    session: req.session,
  }, null, 2));
  return res.render("home", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    sesId: req.sessionID
  });
  return res.status(200).json({ session: req.session, sesId: req.sessionID });
});

router.get("/login", function (req, res) {
  res.render("login", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    sesId: req.sessionID
  });
});

router.post(
  "/login",
  (req, res, next) => { console.log(req.body); next(); },
  authService.passport.authenticate("local", {
    failureRedirect: "/login"
  }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/register", (req, res) => {
  res.render("register", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    sesId: req.sessionID,
  });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // TODO: Body Payload Validation can be done now or just before entering route.

  const payload = {
    email,
    hash: password,
    name: "name:" + Math.random() * 10000,
  };

  try {
    await userService.create(payload);
    console.log("registered");
    res.redirect("/login");
  } catch (error) {
    return res.status(409).json(error);
  }
});

router.get("/logout", (req, res) => {
  console.log("loging out...");
  req.logout();
  res.redirect("/");
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    isAuth: req.isAuthenticated(),
    user: req.user,
    sesId: req.sessionID,
  });
});

module.exports = router;
