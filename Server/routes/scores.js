// Scores route

const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get all
router.get('/leaderboard', (req, res) => {

    const query = `
        SELECT username AS playerName, ScoreAmount AS playerScore
        FROM (
            SELECT s.ScoreAmount, u.username,
            ROW_NUMBER() OVER (ORDER BY s.ScoreAmount DESC) AS rank
            FROM dbo.Score s
            JOIN dbo.Games g ON g.GameId = s.GameId
            JOIN dbo.Users u ON u.UserId = g.UserId
        ) AS rankedScores
        WHERE rank <= 10
        ORDER BY playerScore DESC;
    `;

    pool.query(query, (err, result) => {

        if (err) {
            console.error("Couldn't get leaderboard" + err);
            
            return res.status(500).json({ error: 'Failed SQL'});
        }

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No highscores available!'});
        }

        res.json(result.recordset);
    });

});

router.get('/highscore', (req, res) => {

    var playerName = req.user.userName;

    const query = `
        SELECT MAX(s.ScoreAmount) as highestScore 
        FROM dbo.Score s
        JOIN dbo.Games g ON g.GameId = s.GameId
        JOIN dbo.Users u ON u.UserId = g.UserId
        WHERE u.username = '${playerName}'
    `;

    if (playerName !== '') {

        pool.query(query, (err, result) => {

            if (err) {
                console.error("Couldn't get highscores");
                
                return res.status(500).json({ error: 'Failed SQL'});
            }

            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'Player not found'});
            }
    
            const playerScore = result.recordset[0].highestScore;
            res.json({ playerName, playerScore });
        });
    } 
    else {
        res.status(404).json({ error : 'Cannot get highscore for anonymous player!' });
    }

});


module.exports = router;
