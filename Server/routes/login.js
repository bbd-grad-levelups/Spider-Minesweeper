var express = require('express');
const jwt = require('jsonwebtoken');
const request = require('request');

var router = express.Router();

const privateKey = process.env.minesweeper_private_key;
const appName = process.env.minesweeper_app_name;
const appSecret = process.env.minesweeper_app_secret;

router.post('/', async (req, res) => {
  const { code } = req.body;

  request.post({
      url: 'https://github.com/login/oauth/access_token',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      json: true,
      body: {
          client_id: appName,
          client_secret: appSecret,
          code,
      }
  }, async (error, response, body) => {
      if (error) {
          console.error('Error exchanging code for access token:', error);
          res.json({ success: false });
      } else {
          const accessToken = body.access_token;

          if (accessToken) {
              request.get({
                url: 'https://api.github.com/user',
                headers: {
                  'Authorization': `token ${accessToken}`,
                  'User-Agent': appName
                }
              }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                  const githubUser = JSON.parse(body);
                  const jwtPayload = {
                    userId: githubUser.id,
                    username: githubUser.login,
                  };

                  const jwtToken = jwt.sign(jwtPayload, privateKey, { expiresIn: '1h' });
                  res.json({ jwtToken: jwtToken });
                } else {
                  res.status(401).json({ error: 'Invalid GitHub OAuth token' });
                }
              });
          } else {
              res.json({ success: false });
          }
      }
  });
});

router.get('/username', function(req, res, next) {
  var playerName = req.user.userName;

  if (playerName !== '') {
      res.json({ userName: playerName});
  }
  else {
      res.status(404).json({ error : 'Cannot get username for anonymous player!' });
  }
});

module.exports = router;
