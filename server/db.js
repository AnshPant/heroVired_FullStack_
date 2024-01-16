// const Pool = require("pg").Pool;
// require('dotenv').config();

// const pool = new Pool({
//   user: "root",
//   password: process.env.PSQL_PASS ,
//   // host: "localhost",
//   host: "dpg-cmj28hmd3nmc73clrfj0-a",
//   port: 5432,
//   database: "mashle2",
//   ssl: { rejectUnauthorized: false } 
// });
// const pool = new Pool({

//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",

// })

// pool.connect((err)=>{
//   if(err) throw err;
//   console.log("success conection");
// })
const Pool = require("pg").Pool;
require('dotenv').config();

// const pool = new Pool({
//   user: "postgres",
//   password: process.env.PSQL_PASS ,
//   host: "localhost",
//   port: 5432,
//   database: "mashle2"
// });

const pool = new Pool({

  connectionString: process.env.DB_URL,

  ssl: {

    require: false,

  },

});
async function getPostgresVersion() {

  const client = await pool.connect();

  try {

    const response = await client.query('SELECT version()');

    console.log(response.rows[0]);

  } finally {

    client.release();

  }

}
getPostgresVersion();

module.exports = pool;
