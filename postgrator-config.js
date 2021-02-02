require('dotenv').config();

const database = (process.env.NODE_ENV === 'test')
  ? `${process.env.MIGRATION_DB_NAME}-test`
  : process.env.MIGRATION_DB_NAME

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "host": process.env.MIGRATION_DB_HOST,
  "port": process.env.MIGRATION_DB_PORT,
  "database": database,
  "username": process.env.MIGRATION_DB_USER,
  "password": process.env.MIGRATION_DB_PASS
}
