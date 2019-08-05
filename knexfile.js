const ENV = process.env.NODE_ENV || "development";
const {username} = process.env.NODE_ENV === 'production' ? process.env : require('./config')
const {password} = process.env.NODE_ENV === 'production' ? process.env : require('./config')

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "bendproject",
      username: username,
      password: password
    }
  },
  test: {
    connection: {
      database: "bendproject_test",
      username: username,
      password: password
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
