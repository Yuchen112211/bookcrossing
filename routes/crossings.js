var express = require("express");
var router = express.Router();
const db = require("../db");

router.post("/newSent", function (req, res, next) {
  const crossing = {
    crossingId: "TBD",
    fromUsername: req.body.fromUsername,
    toUsername: req.body.toUsername,
    bookId: req.body.bookId,
    requestedAt: new Date(),
  };
  db.insert("crossings", user, function () {
    res.send({ msg: "success" });
  });
});

module.exports = router;
