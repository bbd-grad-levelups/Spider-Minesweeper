const express = require('express');
const sql = require ('mssql');
const { pool } = require('../db');
const router = express.Router();

router.get('/multiplier', (req, res) => {
  const difficulty = req.query.difficulty;
  const boardSize = req.query.boardSize;

  if (difficulty === undefined || boardSize === undefined) {
    return res.status(500).json({ error: 'Please provide difficulty and boardSize'});
  }

  const query = `
    SELECT (d.ScoreMult * b.ScoreMult) AS [Multiplier]
    FROM dbo.Difficulty d, dbo.BoardSize b
    WHERE d.Difficultyname = @difficulty AND b.SizeDescription = @boardSize
  `;

  pool.request()
    .input('difficulty', sql.VarChar, difficulty)
    .input('boardSize', sql.VarChar, boardSize)
    .query(query)
    .then((result) => {
      if (result.recordset.length === 0) {
        res.status(404).json({ error: 'Could not find combination'});
      }
      else {
        res.json({ Multiplier: result.recordset[0].Multiplier});
      }
  })
  .catch((err) => {
    res.status(500).json({ error: 'Failed SQL'});
  });
});

router.get('/boardsize', (req, res) => {
  pool.request()
  .query('SELECT d.SizeDescription FROM dbo.BoardSize d')
  .then((result) => {
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Could not find any board sizes'});
    }
    else {
      res.json(result.recordset);
    }
  })
  .catch((err) => {
    res.status(500).json({ error: 'Failed SQL'});
  });
});


router.get('/difficulty', (req, res) => {
  pool.request()
  .query('SELECT d.Difficultyname FROM dbo.Difficulty d')
  .then((result) => {
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Could not find any difficulties'});
    }
    else {
      res.json(result.recordset);
    }
  })
  .catch((err) => {
    res.status(500).json({ error: 'Failed SQL'});
  });
});

module.exports = router;
