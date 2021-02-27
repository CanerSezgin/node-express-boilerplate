const {
  PORT,
  NODE_ENV,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD
} = process.env;

const checkRequiredConfigs = (configs) => {
  Object.entries(configs).forEach(([key, value]) => {
    if (!value) {
      console.log(`>>> Missing Config: ${key}`);
    }
  });
  console.log("\n")
};

checkRequiredConfigs({
  NODE_ENV,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
});

module.exports = {
  env: NODE_ENV || "not-set",
  port: PORT || 3000,
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
};
