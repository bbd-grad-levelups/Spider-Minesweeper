// Modifiers route

const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get all
router.get('/', (req, res) => {

    res.json("modifiers endpoint");
});



module.exports = router;