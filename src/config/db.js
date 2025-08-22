import pkg from "pg";
import  dotenv from "dotenv";
 
//create connection pool
dotenv.config();
const pool = new pkg.Pool({
    connectionString: process.env.Database_URL,
});
pool.connect()
    .then(() => console.log('Connected to Postgresql'))
    .catch(err => console.error("connection error", err));

export default pool;