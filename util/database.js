const MongoDB = require("mongodb");

const MongoClient = MongoDB.MongoClient;

let _db;

const MongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://sajijd_ansari:ansarik@98@cluster0-tclaf.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "database not connected!";
};

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
