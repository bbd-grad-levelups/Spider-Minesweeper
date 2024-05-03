// User route

var express = require('express');
var router = express.Router();
var { pool } = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var playerName = req.user.userName;

  if (playerName !== '') {
      res.json({ userName: playerName});
  } 
  else {
      res.status(404).json({ error : 'Cannot get highscore for anonymous player!' });
  }
});

module.exports = router;
