// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Test Router
const testRouter = require('./routes/test');
app.use('/test', testRouter);

// Actors Router
const actorsRouter = require('./routes/Actors');
app.use('/actors', actorsRouter);

// Users router - Mostly for getting usernames
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Games router
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// Scores router
const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

// Board size and difficulty router
const modifiersRouter = require('./routes/modifiers');
app.use('/modifiers', modifiersRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app object
module.exports = app;
