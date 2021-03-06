const mongoose = require('mongoose');
const os = require("os")
const config = require("./config/config");
const app = require('./app');
const logger = require("./lib/logger");

const startMongoDB = async () => {
  const connection = await mongoose.connect(config.mongoose.url, config.mongoose.options);
  return connection.connection.db;
}

const server = app.listen(config.port, async () => {
  try {
    await startMongoDB();
    logger.info("✓ DB: Mongo Connected.")
  } catch (error) {
    logger.error("DB: Mongo Connection Error.", error)
    logger.info("Server Running although there is a DB connection error.")
  }
  const host = os.hostname();
  logger.info(`✓ SERVER: Listening at http://${host}:${server.address().port} in ${config.env} environment.`);
});

server.timeout = 25000; // sets timeout to 25 seconds