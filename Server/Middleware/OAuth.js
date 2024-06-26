const jwt = require('jsonwebtoken');

function oauthMiddleware(req, res, next) {
  var playerName = '';
  var uniqueID = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const accessToken = req.headers.authorization.split(' ')[1];

    const privateKey = process.env.minesweeper_private_key;
    try {
      jwt.verify(accessToken, privateKey, (err, decoded) => {
        if (!err) {
          playerName = decoded.username;
          uniqueID = decoded.userId;
        }
        else {
          console.log("Error with login: " + err);
        }
      });
    } catch (error) {
      console.log("Caught error:" + error);
    }
  }
  else {
    console.log("Anonymous login detected");
  }

  req.user = {
    userName: playerName,
    UID: uniqueID
  }

  next();
}

module.exports = oauthMiddleware;

