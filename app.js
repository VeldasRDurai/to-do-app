const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const homeRouter   = require("./routes/home");
const logInRouter  = require("./routes/log-in");
const signUpRouter = require("./routes/sign-up");
const dashboardRouter = require("./routes/dashboard");
const noteRouter   = require("./routes/note");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/log-in',express.static(path.join(__dirname, 'public')));
app.use('/sign-up',express.static(path.join(__dirname, 'public')));
app.use('/dashboard',express.static(path.join(__dirname, 'public')));
app.use('/dashboard/note',express.static(path.join(__dirname, 'public')));

app.use('/',homeRouter);
app.use('/log-in' ,logInRouter );
app.use('/sign-up',signUpRouter);
app.use('/dashboard',dashboardRouter);
app.use('/dashboard/note',noteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
