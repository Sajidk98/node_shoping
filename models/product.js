const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId=userId
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("product")
        .updateOne({ _id: this._id }, { $set: this })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      return db
        .collection("product")
        .insertOne(this)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("product")
      .find()
      .toArray()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  static fetchOne(id) {
    const db = getDb();
    return db
      .collection("product")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch();
  }

  static deleteOne(id) {
    const db = getDb();
    return db
      .collection("product")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
