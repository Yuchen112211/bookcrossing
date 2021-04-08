// mongodb database wrapper
const mongo = require('mongodb');
const client = mongo.MongoClient;

const mongoUrl = process.env.DB_URL;

exports.getObjectId = function (id) {
  return new mongo.ObjectId(id);
};

exports.selectAll = function (collection, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      dbo
        .collection(collection)
        .find({})
        .sort({datetime: -1})
        .toArray(function (err, docs) {
          if (err) {
            throw err;
          }
          callback(docs);
          db.close();
        });
    }
  );
};

exports.selectOne = function (collection, filter = {}, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      dbo.collection(collection).findOne(filter, function (err, res) {
        if (err) {
          throw err;
        }
        callback(res);
        db.close;
      });
    }
  );
};

exports.select = function (collection, filter = {}, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      dbo
        .collection(collection)
        .find(filter)
        .sort({datetime: -1})
        .toArray(function (err, docs) {
          if (err) {
            throw err;
          }
          callback(docs);
          db.close();
        });
    }
  );
};

exports.insert = function (collection, obj, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      dbo.collection(collection).insertOne(obj, function (err) {
        db.close();
        if (callback) callback(err);
      });
    }
  );
};

exports.update = function (collection, filter, updateDoc, options, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    async function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      await dbo.collection(collection).updateOne(filter, updateDoc, options);
      db.close();
      if (callback) callback();
    }
  );
};

exports.getRandom = function (collection, filter = {}, callback) {
  client.connect(
    mongoUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (err, db) {
      if (err) throw err;
      const dbo = db.db('booksharing');
      dbo
        .collection(collection)
        .aggregate([
          {$match: {username: {$ne: filter.username}}},
          {$sample: {size: 1}},
        ])
        .toArray(function (err, docs) {
          if (err) throw err;
          callback(docs);
          db.close();
        });
    }
  );
};
