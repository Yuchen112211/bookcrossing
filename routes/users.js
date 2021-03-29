var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  console.log("Called users");
  res.json([
    {
      id: 1,
      username: "samsepi0l",
    },
    {
      id: 2,
      username: "D0loresH4ze",
    },
  ]);
});

router.post("/signup", function (req, res, next) {
  const user = {
    username: req.body.Username,
    password: req.body.Password,
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
      res.send({ msg: "success" });
    } else {
      res.send({ msg: "Not exists" });
    }
  });
});

module.exports = router;
