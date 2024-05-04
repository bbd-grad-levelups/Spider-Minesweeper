// Handle OAuth before the request reaches the routes

const { pool } = require('../db');

async function userRegistration(req, res, next) {

  if (req.user.userName !== '') {

    const playerUID = req.user.UID;
    const query = `SELECT * FROM dbo.Users u WHERE u.userUid = ${playerUID}`;

    if (playerUID !== '') {
      try {
        var result = await pool.query(query);
  
        if (result.recordset.length === 0) {
          await addUser(req, res);
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

async function addUser(req, res) {
  // Create player
  const newUser = {
    Username: req.user.userName,
    UserUid: req.user.UID
  }
  const query = `INSERT INTO dbo.Users (Username, UserUid) VALUES ('${newUser.Username}', '${newUser.UserUid}')`;
  console.log('New user: ' + query);
  pool.query(query, (insertErr, insertResult) => {
    console.log('New user created:', insertResult);
  });     
}


module.exports = userRegistration;
