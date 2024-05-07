// Games route

const express = require('express');
const sql = require('mssql');
const { pool } = require('../db');
const router = express.Router();

function getBoard(difficulty, boardLength) {
  const numOfSpider = Math.round((difficulty / 100) * boardLength ** 2);

  var gameBoard = Array.from({ length: boardLength }, () => Array(boardLength).fill(0));

  var spiderPositions = [];
  for (let i = 0; i < numOfSpider; i++) {
    let newPositionX, newPositionY;

    do {
      newPositionX = Math.round(Math.random() * (boardLength -1));;
      newPositionY = Math.round(Math.random() * (boardLength -1));;
    } while (gameBoard[newPositionX][newPositionY] !== 0);

    gameBoard[newPositionX][newPositionY] = -1;
    spiderPositions.push([newPositionX, newPositionY]);
  }

  for (const [x, y] of spiderPositions) {
    for (let i = Math.max(0, x - 1); i <= Math.min(boardLength - 1, x + 1); i++) {
      for (let j = Math.max(0, y - 1); j <= Math.min(boardLength - 1, y + 1); j++) {
        if (gameBoard[i][j] !== -1) {
          gameBoard[i][j] += 1;
        }
      }
    }
  }

  return gameBoard;
}

// Get all
router.get('/board', async (req, res) => {

  var difficulty = req.query.difficulty;
  var boardLength = req.query.boardSize;
  var userName = req.user.userName;

  const boardQuery = `
    SELECT BoardSize, BoardSizeId
    FROM dbo.BoardSize
    WHERE SizeDescription = @boardLength
  `;
  const sizeResult = await pool.request()
      .input('boardLength', sql.VarChar, boardLength)
      .query(boardQuery);
  const gameSize = sizeResult.recordset[0].BoardSize;
  
  const diffQuery = `
    SELECT Bombpercentage, DifficultyId
    FROM dbo.Difficulty
    WHERE Difficultyname = @difficulty
  `;
  const difficultyResult = await pool.request()
    .input('difficulty', sql.VarChar, difficulty)
    .query(diffQuery);
  const gameDifficulty = difficultyResult.recordset[0].Bombpercentage;

  const boardPositions = getBoard(gameDifficulty, gameSize);

  const insertProcedure = 'InsertGame @UserName, @DifficultyName, @SizeDescription, @GameBoard';
  const insertResult = await pool.request()
      .input('UserName', sql.NVarChar, userName)
      .input('DifficultyName', sql.NVarChar, difficulty)
      .input('SizeDescription', sql.NVarChar, boardLength)
      .input('GameBoard', sql.NVarChar, JSON.stringify(boardPositions))
      .query(insertProcedure);

  res.json({
    board: boardPositions,
    gameId: insertResult.recordset[0].GameId
  });

});


module.exports = router;
