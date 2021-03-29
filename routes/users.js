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

router.get("/getUser", function (req, res, next) {
  const user = {
    username: req.body.Username,
  };
  db.select("users", user, function(data) {
    res.status(200).send({user: data})
  })
})

module.exports = router;
