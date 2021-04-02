var express = require("express");
var router = express.Router();
const db = require("../db");

router.post("/newSent", function (req, res, next) {
  console.log(req.cookies);
  const crossing = {
    crossingId: "TBD",
    fromUsername: req.body.fromUsername,
    toUsername: req.body.toUsername,
    toId: req.body.toId,
    fromId: req.cookies.uid,
    bookId: req.body.bookId,
    requestedAt: new Date(),
  };
  db.insert("crossings", crossing, function () {
    res.send({ msg: "success" });
  });
});

module.exports = router;
