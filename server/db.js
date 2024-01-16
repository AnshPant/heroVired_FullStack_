const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: "postgres",
  password: process.env.PSQL_PASS ,
  host: "localhost",
  port: 5432,
  database: "mashle2"
});

module.exports = pool;
