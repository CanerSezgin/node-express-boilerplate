const logger = require("../lib/logger");
const User = require("../models/User");

const create = async userData => {
    const user = await User.create(userData)
    logger.info("User created", user)
    return user;
}

const getByEmail = async email => {
    const user = await User.findOne({ email });
    return user;
}



module.exports = {
    create,
    getByEmail
}