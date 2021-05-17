const bcrypt = require("bcrypt");
const logger = require("../lib/logger");
const User = require("../models/User");

const create = async (userPayload) => {
    const password = userPayload.password;
    delete userPayload.password;
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ ...userPayload, hash })
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