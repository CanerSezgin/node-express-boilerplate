const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const config = require("../config/config");

const RedisStore = connectRedis(session);

const redisClient = redis.createClient(config.redis);

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

const sessionMiddleware = session({
  ...config.session,
  store: new RedisStore({ client: redisClient }),
});

module.exports = (req, res, next) => sessionMiddleware(req, res, next);
