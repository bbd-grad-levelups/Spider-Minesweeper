// routes/test.js

const express = require('express');
const router = express.Router();

// Test endpoint
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = router;
