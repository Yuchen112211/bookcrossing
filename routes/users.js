var express = require("express");
var router = express.Router();
const db = require("../db");

router.post("/signup", function (req, res, next) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    datetime: new Date(),
  };
  db.insert("users", user, function () {
    res.redirect("/");
  });
});

router.post("/getUser", function (req, res, next) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  db.select("users", user, function (data) {
    if (data) {
      res.send({ msg: "success", data: data });
    } else {
      res.send({ msg: "Not exists" });
    }
  });
});

module.exports = router;
