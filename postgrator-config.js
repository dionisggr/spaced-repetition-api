const { NODE_ENV, DATABASE_URL } = require('./src/config');
require('dotenv').config();

const pg = require('pg');
pg.defaults.ssl = NODE_ENV === "production";

const database = (NODE_ENV === 'test')
  ? `${process.env.MIGRATION_DB_NAME}-test`
  : process.env.MIGRATION_DB_NAME;

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": DATABASE_URL
}