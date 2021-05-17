const errors = require("../config/errors");

module.exports = (req, res, next) => {
  console.log(req.session.id);
  console.log(req.user);
  console.log(">>> auth check middleware");
  if (req.user) {
    next();
  } else {
    return res.status(401).json(errors.AUTH_VERIFICATION_FAILED);
  }
};
