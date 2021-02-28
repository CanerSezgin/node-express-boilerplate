const {
  PORT = 3000,
  NODE_ENV = "not-set",
  LOG_LEVEL = "info",
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

module.exports = {
  env: NODE_ENV,
  port: PORT,
  mongoose: {
    url: `mongodb://db:27017/admin`,
    options: {
      auth: {
        user: MONGO_INITDB_ROOT_USERNAME,
        password: MONGO_INITDB_ROOT_PASSWORD,
      },
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  logger: {
    level: LOG_LEVEL
  },
  meta: {
    isProd: NODE_ENV === "production",
    isDev: NODE_ENV === "development"
  }
};
