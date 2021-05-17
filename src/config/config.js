const {
  PORT = 3000,
  NODE_ENV = "not-set",
  LOG_LEVEL = "info",
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  REDIS_PASSWORD,
} = process.env;

const meta = {
  isProd: NODE_ENV === "production",
  isDev: NODE_ENV === "development",
};

module.exports = {
  env: NODE_ENV,
  port: PORT,
  session: {
    secret: "very secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 1000,
      secure: meta.isProd,
    },
    unset: "destroy",
  },
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
  redis: {
    host: "session",
    port: 6379,
    password: REDIS_PASSWORD,
  },
  logger: {
    level: LOG_LEVEL,
  },
  meta
};
