var express = require("express");
var router = express.Router();
const db = require("../db");
/* GET home page. */
router.post("/", function (req, res, next) {
  const user = {
    username: req.body.Username,
    password: req.body.Password,
    datetime: new Date(),
  };
  db.insert("users", user, function () {
    res.redirect("/");
  });
});

module.exports = router;
