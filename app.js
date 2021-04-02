var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var homeRouter   = require("./routes/home");
var logInRouter  = require("./routes/log-in");
var signUpRouter = require("./routes/sign-up");
var dashboardRouter = require("./routes/dashboard");
var noteRouter   = require("./routes/note");

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
