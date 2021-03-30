var express = require("express");
var router = express.Router();
const db = require("../db");

router.post("/getBook", function (req, res, next) {
  var filter = {};
  if (req.body.isbn) {
    filter.isbn = new RegExp(req.body.isbn);
  }
  if (req.body.title) {
    filter.title = new RegExp(req.body.title);
  }
  db.select("books", filter, function (data) {
    res.send({ msg: "success", data: data });
  });
});

module.exports = router;
