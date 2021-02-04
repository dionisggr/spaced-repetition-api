require('dotenv').config();

const database = (process.env.NODE_ENV === 'test')
  ? `${process.env.MIGRATION_DB_NAME}-test`
  : process.env.MIGRATION_DB_NAME

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DATABASE_URL
}
