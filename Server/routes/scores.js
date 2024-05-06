// Scores route

const express = require('express');
const { pool } = require('../db');
const sql = require('mssql');
const router = express.Router();

// Submit a game score
router.get('/submit', async (req, res) => {
  try {
    const gameId = req.query.gameId;
    const gameScore = req.query.score;
    const playerUid = req.user.UID;

    // Query to check if the game exists
    const gameQuery = `
      SELECT *
      FROM dbo.Games g
      JOIN dbo.Users u ON u.userId = g.userId
      WHERE g.GameId = ${gameId}
    `;

    // Execute the game query
    const gameResult = await pool.query(gameQuery);

    // Check if the game exists
    if (gameResult.recordset.length === 0) {
      console.error("Requested game doesn't exist");
      return res.status(404).json({ error: "This game does not exist!" });
    }

    // Insert the score
    const scoreQuery = `
      INSERT INTO dbo.Score (ScoreAmount, GameId)
      VALUES (${gameScore}, ${gameId});

      UPDATE dbo.Games g
      SET g.GameStatusId = (SELECT GameStatusId FROM dbo.GameStatus WHERE GameStatusName = 'Completed')
      WHERE g.GameId = ${gameId};
    `;
    await pool.query(scoreQuery);

    return res.status(200).json({ message: "Score submitted successfully" });
  } catch (error) {
    console.error("Failed operation:", error);
    return res.status(500).json({ error: "Failed operation" });
  }
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

  var playerName = req.user.userName;

  const query = `
    SELECT MAX(s.ScoreAmount) as highestScore 
    FROM dbo.Score s
    JOIN dbo.Games g ON g.GameId = s.GameId
    JOIN dbo.Users u ON u.UserId = g.UserId
    WHERE u.username = @playerName
  `;

  if (playerName !== '') {
    pool.request()
    .input('playerName', sql.VarChar, playerName)
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
      console.error("Couldn't get highscores");
      return res.status(500).json({ error: 'Failed SQL'});
    });
  } 
  else {
    res.status(404).json({ error : 'Cannot get highscore for anonymous player!' });
  }

});


module.exports = router;
