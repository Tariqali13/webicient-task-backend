const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const Api = require('./src/api');
const session = require('express-session');
const config = require('config');
const cors = require('cors');
const expressSessionSecret = config.get('expressSessionSecret');

require('./config/db');
const app = express();

const corsOpt = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  maxAge: 10 * 60,
};
app.options('*', cors(corsOpt));
app.use(cors(corsOpt));
// Initializes passport and passport sessions
app.use(
  session({
    secret: expressSessionSecret,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', Api);

app.use('/status', async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Ok Working',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
