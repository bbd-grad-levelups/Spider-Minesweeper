// Main Server logic

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// OAuth Step
const oauthMiddleware = require('./Middleware/OAuth');
app.use(oauthMiddleware);

const registrationMiddleware = require('./Middleware/RegisterUser');
app.use(registrationMiddleware);

// Test Router
const testRouter = require('./routes/test');
app.use('/test', testRouter);

// Games router
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// Board size and difficulty router
const modifiersRouter = require('./routes/modifiers');
app.use('/modifiers', modifiersRouter);

// Scores router
const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

// Users router - Mostly for getting usernames
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Login router - JWT token
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app object
module.exports = app;