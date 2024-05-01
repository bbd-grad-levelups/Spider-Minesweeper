// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// OAuth Step
const oauthMiddleware = require('./Middleware/OAuth');
app.use(oauthMiddleware);

// Actors Router
const actorsRouter = require('./routes/Actors').default;
app.use('/actors', actorsRouter);

// Test Router
const testRouter = require('./routes/test').default;
app.use('/test', testRouter);

// Games router
const gamesRouter = require('./routes/games').default;
app.use('/games', gamesRouter);

// Board size and difficulty router
const modifiersRouter = require('./routes/modifiers').default;
app.use('/modifiers', modifiersRouter);

// Scores router
const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

// Users router - Mostly for getting usernames
const usersRouter = require('./routes/users').default;
app.use('/users', usersRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app object
module.exports = app;
