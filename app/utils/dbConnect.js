// app/utils/dbConnect.js
import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function verifyConnection() {
  try {
    const res = await pool.query('SELECT * FROM task_table LIMIT 1');
    console.log('Database connection verified:', res.rows);
  } catch (err) {
    console.error('Error verifying database connection:', err);
  }
}

verifyConnection();
