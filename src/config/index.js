require('dotenv').config();
const fatal = require('../utils/fatal');

const config = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
  db: {
    client: 'postgres',
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    connection: {
      user: process.env.DB_USER || fatal('no DB_USER'),
      host: process.env.DB_HOST || fatal('no DB_HOST'),
      port: process.env.DB_PORT || fatal('no DB_PORT'),
      database: process.env.DB_NAME || fatal('no DB_NAME'),
      password: process.env.DB_PASS || fatal('no DB_PASS'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  authorization: {
    userData: {
      username: process.env.LOGIN || 'admin',
      password: process.env.PASSWORD || 'admin',
    },
    sessionSecret: process.env.SESSION_SECRET || 'secret_key',
  },
};

module.exports = config;
