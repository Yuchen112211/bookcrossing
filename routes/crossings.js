var express = require("express");
var router = express.Router();
var md5 = require("md5");
const db = require("../db");

router.post("/newSent", function (req, res, next) {
  const crossing = {
    crossingId: "TBD",
    fromUsername: req.body.fromUsername,
    toUsername: req.body.toUsername,
    toId: req.body.toId,
    fromId: req.cookies.uid,
    bookId: req.body.bookId,
    requestedAt: new Date(),
  };
  const hashVal = md5(JSON.stringify(crossing));
  crossing.crossingId = hashVal;
  db.insert("crossings", crossing, function () {
    res.send({ msg: "success" });
  });
});

module.exports = router;
