var express = require("express");
var router = express.Router();
const db = require("../db");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    const user = {
      username: username,
      password: password,
    };
    db.selectOne("users", user, function (user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "This combination of username/password does not exist",
        });
      }
    });
  })
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json(info);
    }
    const uid = user._id.toString();
    return res
      .cookie("uid", uid)
      .status(200)
      .json({ msg: "success", data: user });
  })(req, res, next);
});

module.exports = router;
