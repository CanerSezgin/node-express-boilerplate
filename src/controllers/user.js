const userService = require("../services/user.service")

const getUserDetails = async (req, res, next) => {
    const { user } = req;
    const userDetails = await userService.getByEmail(user.email)
    console.log(userDetails, user)
    return res.status(200).json(userDetails);
}

module.exports = {
    getUserDetails
}