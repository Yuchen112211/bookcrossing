var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const config = require("dotenv").config();
var passport = require("passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");
var crossingsRouter = require("./routes/crossings");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/crossings", crossingsRouter);

app.get("/*", (req, res) =>
  res.sendFile(path.resolve("client", "build", "index.html"))
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (config.error) {
  console.log("No local .env file specified, ignoring");
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 1337;
app.listen(port);

console.log(`App listening on ${port}`);
module.exports = app;
