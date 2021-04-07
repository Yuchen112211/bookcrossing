var express = require("express");
var router = express.Router();
const db = require("../db");
const ObjectId = require("mongodb").ObjectID;

router.get("/send", function (req, res, next) {
  const uid = req.cookies.uid;
  // Get random user
  db.select("users", { _id: { $ne: ObjectId(uid) } }, function (users) {
    if (!users || users.length === 0) {
      return res.status(400).json({ errors: "not enough users" });
    }
    recipent = users[Math.floor(Math.random() * users.length)];
    // retrieve my info
    db.selectOne("users", { _id: ObjectId(uid) }, function (user) {
      sender = user;
      // build crossing
      const crossing = {
        crossingId: generateId(),
        fromUsername: sender.username,
        toUsername: recipent.username,
        fromId: sender._id.toString(),
        toId: recipent._id.toString(),
        mailingAddress: recipent.mailingAddress,
        requestedAt: new Date(),
      };
      db.insert("crossings", crossing, function () {
        delete crossing.fromId;
        delete crossing.toId;
        res.send({ msg: "success", data: crossing });
      });
    });
  });
});

router.post("/register", function (req, res, next) {
  const uid = req.cookies.uid;
  const crossingId = req.body.crossingId;
  db.update(
    "crossings",
    { toId: uid, crossingId: crossingId },
    { $set: { receivedAt: new Date() } },
    {},
    function () {
      res.send({ msg: "success" });
    }
  );
});

function generateId() {
  const PREFIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMERIC_CHARS = "0123456789";
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 2; i++) {
    result.push(
      PREFIX_CHARS.charAt(Math.floor(Math.random() * PREFIX_CHARS.length))
    );
  }
  result.push("-");
  for (var i = 0; i < 6; i++) {
    result.push(
      NUMERIC_CHARS.charAt(Math.floor(Math.random() * NUMERIC_CHARS.length))
    );
  }
  return result.join("");
}

module.exports = router;
