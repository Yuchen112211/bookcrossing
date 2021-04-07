var express = require("express");
var router = express.Router();
const db = require("../db");

router.post("/signup", function (req, res, next) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    mailingAddress: req.body.address,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    datetime: new Date(),
  };
  db.insert("users", user, function (err) {
    if (err && err.code === 11000) {
      return res.status(400).json({ errors: "Username already exists" });
    }
    res.send({ msg: "success"});
  });
});

router.post("/getUser", function (req, res, next) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  db.select("users", user, function (data) {
    if (data.length == 1) {
      res.send({ msg: "success", data: data });
    } else {
      res.send({ msg: "Not exists" });
    }
  });
});

router.get("/info/:username", function (req, res, next) {
  uid = req.cookies.uid;
  username = req.params.username;

  db.selectOne("users", { username: username }, function (user) {
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    user.sent = [];
    user.received = [];
    user.traveling = [];
    userId = user._id.toString();
    db.select(
      "crossings",
      { $or: [{ fromId: userId }, { toId: userId }] },
      function (crossings) {
        for (i in crossings) {
          if (crossings[i].fromId === userId) {
            if (crossings[i].receivedAt) {
              user.sent.push(crossings[i]);
            } else {
              user.traveling.push(crossings[i]);
            }
          } else if (crossings[i].toId === userId && crossings[i].receivedAt) {
            user.received.push(crossings[i]);
          }
          delete crossings[i]._id;
          delete crossings[i].fromId;
          delete crossings[i].toId;
        }
        if (uid === userId) {
        } else {
          delete user.mailingAddress;
        }
        delete user.password;
        delete user.datetime;
        delete user._id;
        return res.status(200).json({ msg: "success", data: user });
      }
    );
  });
});

router.get("/travelingCount", function (req, res, next) {
  uid = req.cookies.uid;
  db.select("crossings", { fromId: uid }, function (crossings) {
    let count = 0;
    for (i in crossings) {
      if (!crossings[i].receivedAt) {
        count += 1;
      }
    }
    return res.status(200).json({ msg: "success", data: {travelingCount : count} });
  });
});

router.post("/getRandom", function (req, res, next) {
  const user = {
    username: req.body.username, 
  };
  db.getRandom("users", user, function (data) {
    console.log(
      `Got Random user: ${data[0].username} with address: ${data[0].mailing_address}`
    );
    res.send({ msg: "success", data: data });
  });
});

module.exports = router;
