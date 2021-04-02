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
    if (data.length == 1) {
      res.send({ msg: "success", data: data });
    } else {
      res.send({ msg: "Not exists" });
    }
  });
});

router.get("/info/:username", function (req, res, next) {
  console.log("Cookies: ", req.cookies);
  console.log("req.params: ", req.params);

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
        console.log(user);
        return res.status(200).json({ msg: "success", data: user });
      }
    );
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
