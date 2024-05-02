const sql = require('mssql');

// Database configuration
const config = {
  server: 'localhost', // You can use 'localhost' if the server is running on the same machine
  database: 'MovieDB',
  user: 'expressUser',
  password: 'pass123',
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

// Create a new connection pool
const pool = new sql.ConnectionPool(config);

// Connect to the database
pool.connect()
  .then(() => {
    console.log('Connected to Microsoft SQL Server database');
  })
  .catch(err => {
    console.error('Error connecting to Microsoft SQL Server database:', err);
  });

module.exports = { pool };
