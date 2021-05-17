const userService = require("../services/user.service");

const loginSuccess = async (req, res, next) => {
  console.log(req.baseUrl);
  return res.status(200).json({ message: "Logged in successfully." });
};

const logout = async (req, res) => {
  req.logout();
  console.log("logged out");
  return res.status(204).json(null);
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  // TODO: Body Payload Validation can be done now or just before entering route.

  const payload = {
    email,
    password,
    name,
  };

  try {
    const user = await userService.create(payload);
    return res.status(201).json({ msg: "Registered successfully.", user });
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
};

module.exports = {
  loginSuccess,
  logout,
  register,
};
