require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');

async function init() {
  const sql = fs.readFileSync('./db/init.sql', 'utf8');
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    ...(process.env.DB_SSL === 'true' && {
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    })
  });

  try {
    console.log('Running init.sql on TiDB...');
    await connection.query(sql);
    console.log('Database initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

init();
