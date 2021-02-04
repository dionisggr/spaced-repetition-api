require('dotenv').config();

const database = (process.env.NODE_ENV === 'test')
  ? `${process.env.MIGRATION_DB_NAME}-test`
  : process.env.MIGRATION_DB_NAME

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": "postgres://avdqdhryeuhbcz:4b8e811dfcc3ce911748416eee6b63eba145cea97b56b6425e310a063af41155@ec2-3-222-11-129.compute-1.amazonaws.com:5432/d28mg7kiovta8i",
  // "host": process.env.MIGRATION_DB_HOST,
  // "port": process.env.MIGRATION_DB_PORT,
  // "database": database,
  // "username": process.env.MIGRATION_DB_USER,
  // "password": process.env.MIGRATION_DB_PASS
}
