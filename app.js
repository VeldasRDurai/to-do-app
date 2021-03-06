const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose     = require("mongoose");

const app = express();

// mongoose.connect( "mongodb://localhost:27017/" + "to-do-app" , 
mongoose.connect( "mongodb+srv://VeldasRDurai:" + process.env.MONGODB_PASSWORD + "@cluster0.do7n3.mongodb.net/" + "to-do-app" + "?retryWrites=true&w=majority" ,
    { useNewUrlParser:true , useUnifiedTopology: true} );
const accountSchema = new mongoose.Schema ({
  email : { type : String , required: [ true , " No email specified...!"     ] },
  name  : { type : String , required: [ true , " No name specified...!"     ] },
  // images : { data: Buffer, type: String  }
  googleSignIn : { type : Boolean , default : false } ,
  verifiedUser : { type : Boolean , default : false } ,
  verificationCode :  { type : String } ,
  password : { type : String },
  refreshToken : { type : String } ,
});
const noteSchema   = new mongoose.Schema({
  time    : { type : Date   , required: [ true , " No Date specified...!"      ] },
  heading : { type : String , default : "Untitled" },
  content : { type : String },
});
const detailsSchema = new mongoose.Schema ({
  email : { type : String , required: [ true , " No name specified...!"     ] },
  name  : { type : String , required: [ true , " No name specified...!"     ] },
  notes    : { type : [noteSchema] },
});
const users   = mongoose.model( "Users" , accountSchema );
const details = mongoose.model( "Details" , detailsSchema );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const homeRouter   = require("./routes/home");
const logInRouter  = require("./routes/log-in");
const signUpRouter = require("./routes/sign-up");
const googleSignInRouter = require('./routes/google-sign-in');
const logOutRouter = require("./routes/log-out");
const dashboardRouter = require("./routes/dashboard");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/log-in',express.static(path.join(__dirname, 'public')));
app.use('/sign-up',express.static(path.join(__dirname, 'public')));
app.use('/google-sign-in',express.static(path.join(__dirname, 'public')));
app.use('/log-out',express.static(path.join(__dirname, 'public')));
app.use('/dashboard',express.static(path.join(__dirname, 'public')));

app.use('/',homeRouter);
app.use('/log-in' ,  logInRouter({ users:users }) );
app.use('/sign-up', signUpRouter({ users:users }) );
app.use('/log-out', logOutRouter({ users:users }) );
app.use('/google-sign-in', googleSignInRouter({users:users}) );
app.use('/dashboard', dashboardRouter({ users:users , details:details }));

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
