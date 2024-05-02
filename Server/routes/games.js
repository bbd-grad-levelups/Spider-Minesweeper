// Games route

const express = require('express');
const { pool } = require('../db');
const router = express.Router();

const spiderNumber = {
    'easy': 2,
    'middle': 4,
    'hard': 8,
};

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getBoard(difficulty, boardLength) {
    const numOfSpider = spiderNumber[difficulty];

    gameBoard = [];

    for (let i = 0; i < boardLength; i++) {
        gameBoard[i] = [];
        for(let j = 0; j < boardLength; j++) {
            gameBoard[i][j] = 0;
        }
    }

    const spiderPositions = [];

    for (let i = 0; i < numOfSpider; i++) {

        let newPositionX = getRandomInt(0, boardLength - 1);
        let newPositionY = getRandomInt(0, boardLength - 1);

        while (gameBoard[newPositionX][newPositionY] !== -1){
            newPositionX = getRandomInt(0, boardLength - 1);
            newPositionY = getRandomInt(0, boardLength - 1);
            gameBoard[newPositionX][newPositionY] = -1;
        }

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
router.get('/board', (req, res) => {

    difficulty = req.params.difficulty;
    boardLength = req.params.boardLength;

    const boardPositions = getBoard(difficulty, boardLength);

    res.json(boardPositions);
});



module.exports = router;
