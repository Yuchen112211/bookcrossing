const express = require("express");
const db = require("../db");

const router = new express.Router();

router.post("/getBook", function (req, res, next) {
  const filter = {};
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
