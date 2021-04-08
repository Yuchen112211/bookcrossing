const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('dotenv').config();
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const crossingsRouter = require('./routes/crossings');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/crossings', crossingsRouter);

app.get('/*', (req, res) =>
  res.sendFile(path.resolve('client', 'build', 'index.html'))
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (config.error) {
  console.log('No local .env file specified, ignoring');
}

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 1337;
app.listen(port);

console.log(`App listening on ${port}`);
module.exports = app;
