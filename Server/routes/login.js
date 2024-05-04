// User route

var express = require('express');
const jwt = require('jsonwebtoken');
const request = require('request');
const fs = require('fs');

var router = express.Router();

// Load RSA private key
const privateKey = process.env.minesweeper_private_key;
const appName = process.env.minesweeper_app_name;

/* GET login */
router.get('/', function(req, res) {

  const githubToken = req.headers.authorization.replace('Bearer ', '');
  console.log(githubToken);
  // Verify the GitHub OAuth token by making a request to GitHub's authentication endpoint
  request.get({
    url: 'https://api.github.com/user',
    headers: {
      'Authorization': `token ${githubToken}`,
      'User-Agent': appName
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const githubUser = JSON.parse(body);

      // Generate a JWT token with GitHub user information
      const jwtPayload = {
        userId: githubUser.id,
        username: githubUser.login,
        // Add other relevant user data as needed
      };

      // Sign JWT token with private key
      const jwtToken = jwt.sign(jwtPayload, privateKey, { expiresIn: '1h' });

      // Send JWT token back to the client
      res.json({ jwtToken });
    } else {
      // Handle error when verifying GitHub OAuth token
      console.log(error);
      console.log(response);
      res.status(401).json({ error: 'Invalid GitHub OAuth token' });
    }
  });
});

module.exports = router;
