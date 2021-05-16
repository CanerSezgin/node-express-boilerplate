const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const RedisStore = connectRedis(session);

//Configure redis client
const redisClient = redis.createClient({
  host: "session",
  port: 6379,
  password: process.env.REDIS_PASSWORD
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: "very secret key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    secure: false, // true in prod
  },
  unset: "destroy",
});

module.exports = (req, res, next) => sessionMiddleware(req, res, next);