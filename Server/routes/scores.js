// Scores route

const express = require('express');
const { pool } = require('../db').default;
const router = express.Router();

// Get all
router.get('/', (req, res) => {

    res.json("scores endpoint");
});



module.exports = router;
