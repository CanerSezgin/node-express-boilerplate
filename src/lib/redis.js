const redis = require("redis");
const { promisify } = require("util");
const logger = require("./logger");

const conf = {
    host: "cache",
    port: 6379,
    password: process.env.REDIS_PASSWORD
};

const client = redis.createClient(conf);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const scanAsync = promisify(client.scan).bind(client);

client.on("error", (err) => {
  logger.error("Redis Error | ", err)
});

client.on("ready", () => {
  logger.info("✓ CACHE: Redis is Ready.")
});

module.exports = {
    getAsync,
    setAsync,
    delAsync,
    scanAsync
}