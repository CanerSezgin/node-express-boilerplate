const {
  PORT,
  NODE_ENV,
  MONGO_URL,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
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
  MONGO_URL,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
});

module.exports = {
  env: NODE_ENV || "not-set",
  port: PORT || 3000,
  mongoose: {
    url: MONGO_URL,
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
