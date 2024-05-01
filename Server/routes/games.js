// Games route

import { Router } from 'express';
import { pool } from '../db';
const router = Router();

const spiderNumber = {
    'easy': 2,
    'middle': 4,
    'hard': 8,
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored+1 - minCeiled) + minCeiled);
}

// Get all
router.get('/', (req, res) => {

    const difficulty = modifier.difficulty;

    const numOfSpider = spiderNumber.difficulty;

    const boardSize = modifier.boardSize * modifier.boardSize;

    let spiderPosition = []

    for (let i = 0; i < numOfSpider; i++){
        spiderPosition.push(getRandomInt(0,boardSize));
    }

    //render spider in the block according the position


    res.json("games endpoint");
});



export default router;
