// Handle OAuth before the request reaches the routes

const { pool } = require('../db');
const sql = require('mssql');

async function userRegistration(req, res, next) {

  if (req.user.userName !== '') {

    const playerUID = req.user.UID.toString();
    const query = `SELECT * FROM dbo.Users u WHERE u.userUid = @playerUID`;

    if (playerUID !== '') {
      try {
        var result = await pool.request()
        .input('playerUID', sql.VarChar, playerUID)
        .query(query);
  
        if (result.recordset.length === 0) {
          await addUser(req);
        } 
        else {
          console.log('user exists!');
        }
      }
      catch (err) {
        console.error("Couldn't get users:" + err);
                
        return res.status(500).json({ error: 'Failed SQL'});
      }
    }
  }

  next();
}

async function addUser(req) {
  
  const query = `INSERT INTO dbo.Users (Username, UserUid) VALUES (@username, @uid)`;
  
  await pool.request()
  .input('username', sql.VarChar, req.user.userName)
  .input('uid', sql.VarChar, req.user.UID.toString())
  .query(query)
  .then((insertResult) => {
    console.log('New user created:', insertResult);
  })
  .catch((err) => {
    console.log("Could not register user: " + err);
  });   
}


module.exports = userRegistration;
