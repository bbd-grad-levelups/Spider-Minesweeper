// Scores route

const express = require('express');
const { pool } = require('../db');
const sql = require('mssql');
const router = express.Router();

// Submit a game score
router.get('/submit', async (req, res) => {
  const gameId = req.query.gameId;
  const gameScore = req.query.score;
  const playerUid = req.user.UID;

  pool.request()
  .input('gameId', sql.Int, gameId)
  .input('gameScore', sql.Int, gameScore)
  .input('playerUid', sql.Int, playerUid)
  .execute('SubmitGameScore')
  .then(() => {
    res.status(200).json({ message: "Score submitted successfully" });
  })
  .catch((error) => {
    console.error("Failed operation:", error);
    res.status(500).json({ error: "Failed operation" });
  });
});

// Get all
router.get('/leaderboard', (req, res) => {

    const query = `
    SELECT TOP 10 u.username AS playerName, s.ScoreAmount AS playerScore
    FROM dbo.Score s
    JOIN dbo.Games g ON g.GameId = s.GameId
    JOIN dbo.Users u ON u.UserId = g.UserId
    ORDER BY s.ScoreAmount DESC;
    `;

    pool.request()
    .query(query)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'No highscores available!'});
      }
      else {
        res.json(result.recordset);
      }
    })
    .catch((err) => {
      console.error("Couldn't get leaderboard" + err);
      res.status(500).json({ error: 'Failed SQL'});
    });
});

router.get('/highscore', (req, res) => {

  const playerUid = req.user.UID.toString();
  const playerName = req.user.userName;

  const query = `
    SELECT MAX(s.ScoreAmount) as highestScore 
    FROM dbo.Score s
    JOIN dbo.Games g ON g.GameId = s.GameId
    JOIN dbo.Users u ON u.UserId = g.UserId
    WHERE u.UserUid = @uid
  `;

  if (playerUid !== '') {
    pool.request()
    .input('uid', sql.VarChar, playerUid)
    .query(query)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Player not found'});
      }
      else {
        res.json({ 
          playerName: playerName, 
          playerScore: result.recordset[0].highestScore 
        });
      }
    })
    .catch((err) => {
      console.error("Couldn't get highscores: "+ err);
      return res.status(500).json({ error: 'Failed SQL'});
    });
  } 
  else {
    res.status(404).json({ error : 'Cannot get highscore for anonymous player!' });
  }

});


module.exports = router;
