require('dotenv').config();
const db = require('./src/config/db');

async function checkConnection() {
  try {
    console.log('Attempting to connect to TiDB Cloud...');
    const [rows] = await db.query('SELECT 1 as result');
    console.log('Success! Connection established. Query Result:', rows);
    process.exit(0);
  } catch (error) {
    console.error('Failed to connect:', error.message);
    process.exit(1);
  }
}

checkConnection();
