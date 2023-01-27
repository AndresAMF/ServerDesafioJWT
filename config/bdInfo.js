const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "sudo",
  database: "softjobs",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = pool;
