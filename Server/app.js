const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

const oauthMiddleware = require('./Middleware/OAuth');
app.use(oauthMiddleware);

const registrationMiddleware = require('./Middleware/RegisterUser');
app.use(registrationMiddleware);

const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

const modifiersRouter = require('./routes/modifiers');
app.use('/modifiers', modifiersRouter);

const scoresRouter = require('./routes/scores');
app.use('/scores', scoresRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

module.exports = app;
