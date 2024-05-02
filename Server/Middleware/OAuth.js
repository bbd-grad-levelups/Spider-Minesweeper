// Handle OAuth before the request reaches the routes

const jwt = require('jsonwebtoken');

function oauthMiddleware(req, res, next) {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

    const accessToken = req.headers.authorization.split(' ')[1];

    // Verify the access token (example: using a JWT library)
    // This is where you would implement your OAuth validation logic

    const key = '';

    try {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          console.log("Error login detected, going for anon");
          req.user = {
            userId: "",
            UniqueIdentifier: ""
          }
          // return res.status(400).send('Invalid OAuth Token.');
        }
        else
        {
          // Get UID and username from decoded
          console.log(decoded);
          req.user = {
            userId: decoded,
            UniqueIdentifier: decoded,
            accessToken: accessToken
          };
        }
      });
    } catch (error) {
      console.log("Strange token detected?: " + accessToken);
      // return res.status(400).send('Invalid OAuth Token.');
      console.log("Incorrect login detected, going for anon");
      req.user = {
        userId: "",
        UniqueIdentifier: ""
      }
    }

  }
  else {
    console.log("Anonymous login detected");
    req.user = {
      userId: "",
      UniqueIdentifier: ""
    }
  }

  next();
}

module.exports = oauthMiddleware;

