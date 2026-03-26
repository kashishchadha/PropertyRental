require('./config/env');
const app = require('./app');
const env = require('./config/env');
const pool = require('./config/db');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForDatabase = async (maxAttempts = 30, delayMs = 2000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await pool.query('SELECT 1');
      console.log('Database connection established.');
      return;
    } catch (error) {
      console.log(`Database not ready (attempt ${attempt}/${maxAttempts}): ${error.message}`);
      if (attempt === maxAttempts) {
        throw error;
      }
      await sleep(delayMs);
    }
  }
};

const start = async () => {
  try {
    await waitForDatabase();
    app.listen(env.port, () => {
      console.log(`Backend API running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
