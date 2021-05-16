module.exports = (req, res, next) => {
  console.log(req.session.id)
  console.log(req.user)
  console.log(">>> auth check middleware")
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized" })
  }
};
