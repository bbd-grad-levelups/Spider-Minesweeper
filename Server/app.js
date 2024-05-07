// Main Server logic

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// OAuth
const oauthMiddleware = require('./Middleware/OAuth');
app.use(oauthMiddleware);

// User Registration
const registrationMiddleware = require('./Middleware/RegisterUser');
app.use(registrationMiddleware);

// Games router
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// Board size and difficulty router
const modifiersRouter = require('./routes/modifiers');
app.use('/modifiers', modifiersRouter);

// Scores router
const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

// Login router - User management
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Export the app object
module.exports = app;
