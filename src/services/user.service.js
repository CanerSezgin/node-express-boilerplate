const logger = require("../lib/logger");
const User = require("../models/User");

const createUser = async userData => {
    const user = await User.create(userData)
    logger.info("User created", user)
    return user;
}

module.exports = {
    createUser
}