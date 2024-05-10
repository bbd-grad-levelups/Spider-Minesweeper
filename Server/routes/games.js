const express = require('express');
const sql = require('mssql');
const { pool } = require('../db');
const router = express.Router();

function getBoard(difficulty, boardLength) {
  const numOfSpider = Math.round((difficulty / 100) * boardLength ** 2);
  let gameBoard = [];

  for (let i = 0; i < boardLength; i++) {
      gameBoard[i] = [];

      for(let j = 0; j < boardLength; j++) {
          gameBoard[i][j] = {
            revealed: false,
            flagged: false,
            count: 0,
          };
      }
  }

  var spiderPositions = [];
  for (let i = 0; i < numOfSpider; i++) {
      let newPositionX = Math.round(Math.random() * (boardLength -1));
      let newPositionY = Math.round(Math.random() * (boardLength -1));

      while (gameBoard[newPositionX][newPositionY].count === -1){
          newPositionX = Math.round(Math.random() * (boardLength -1));
          newPositionY = Math.round(Math.random() * (boardLength -1));
      }

      gameBoard[newPositionX][newPositionY].count = -1;
      spiderPositions.push([newPositionX, newPositionY]);
  }

  for (const [x, y] of spiderPositions) {
      for (let i = Math.max(0, x - 1); i <= Math.min(boardLength - 1, x + 1); i++) {
          for (let j = Math.max(0, y - 1); j <= Math.min(boardLength - 1, y + 1); j++) {
              if (gameBoard[i][j].count !== -1) {
                      gameBoard[i][j].count += 1;
              }
          }
      }
  }

  return { gameBoard, numOfSpider };
}

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
  let gameId = -1;

  if (userName !== '') {
    const insertProcedure = 'InsertGame @UserName, @DifficultyName, @SizeDescription, @GameBoard';
    const insertResult = await pool.request()
        .input('UserName', sql.NVarChar, userName)
        .input('DifficultyName', sql.NVarChar, difficulty)
        .input('SizeDescription', sql.NVarChar, boardLength)
        .input('GameBoard', sql.NVarChar, JSON.stringify(boardPositions))
        .query(insertProcedure);
    gameId = insertResult.recordset[0].GameId
  }

  res.json({
    board: boardPositions,
    spiderNum: Math.round((gameDifficulty / 100) * gameSize ** 2),
    gameId: gameId
  });
});

module.exports = router;
