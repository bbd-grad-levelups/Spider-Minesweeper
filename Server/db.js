const sql = require('mssql');

const config = {
  server: process.env.minesweeper_db_endpoint,
  database: 'SpiderSweeperDB',
  user: process.env.minesweeper_db_user,
  password: process.env.minesweeper_db_password,
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);

pool.connect()
  .then(() => {
    console.log('Connected to Microsoft SQL Server database');
  })
  .catch(err => {
    console.error('Error connecting to Microsoft SQL Server database:', err);
  });

module.exports = { pool };
