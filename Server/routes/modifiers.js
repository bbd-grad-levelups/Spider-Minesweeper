// Modifiers route

const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get total mult
router.get('/multiplier', (req, res) => {
  const difficulty = req.query.difficulty;
  const boardSize = req.query.boardSize;

  if (difficulty === undefined || boardSize === undefined) {
    return res.status(500).json({ error: 'Please provide difficulty and boardSize'});
  }

  const query = `
        SELECT (d.ScoreMult * b.ScoreMult) AS [Multiplier]
        FROM dbo.Difficulty d, dbo.BoardSize b
        WHERE d.Difficultyname = '${difficulty}' AND b.SizeDescription = '${boardSize}'
  `;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed SQL'});

    }
    else if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Could not find combination'});
    }
    else {
        
      const finalMult = result.recordset[0].Multiplier;
      res.json({ Multiplier: finalMult});
    }

  });
});


router.get('/boardsize', (req, res) => {

  const query = `
  SELECT d.SizeDescription
  FROM dbo.BoardSize d
  `;

  pool.query(query, (err, result) => {
  if (err) {
    return res.status(500).json({ error: 'Failed SQL'});

  }
  else if (result.recordset.length === 0) {
    return res.status(404).json({ error: 'Could not find any board sizes'});
  }
  else {      
    res.json(result.recordset);
  }

  });

});


router.get('/difficulty', (req, res) => {

  const query = `
  SELECT d.Difficultyname
  FROM dbo.Difficulty d
  `;

  pool.query(query, (err, result) => {
  if (err) {
    return res.status(500).json({ error: 'Failed SQL'});

  }
  else if (result.recordset.length === 0) {
    return res.status(404).json({ error: 'Could not find any difficulties'});
  }
  else {      
    res.json(result.recordset);
  }

  });

});



module.exports = router;
