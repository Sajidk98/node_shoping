const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const objectId = mongodb.ObjectID;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items:[{productId, quantity}]}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .inertOne(this)
      .then(() => console.log(res))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const db = getDb();
    let cartItems = [];
    if (this.cart) {
      cartItems = this.cart.items;
      const cartIndex = cartItems.findIndex(
        (i) => i.productId.toString() === product._id.toString()
      );

      if (cartIndex >= 0) {
        cartItems[cartIndex] = {
          ...cartItems[cartIndex],
          quantity: cartItems[cartIndex].quantity + 1,
        };
      } else {
        cartItems.push({ productId: product._id, quantity: 1 });
      }
    } else {
      cartItems = [{ productId: product._id, quantity: 1 }];
    }

    return db
      .collection("users")
      .updateOne(
        { _id: new objectId(this._id) },
        { $set: { cart: { items: cartItems } } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection("product")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (i) => i.productId.toString() === product._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteCartById(prodId) {
    const db = getDb();
    const updatedCartItem = this.cart.items.filter(
      (i) => i.productId.toString() !== prodId.toString()
    );
    return db
      .collection("users")
      .updateOne(
        { _id: new objectId(this._id) },
        { $set: { cart: { items: updatedCartItem } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const orders = {
          items: products,
          user: {
            _id: new objectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(orders);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new objectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new objectId(this._id) })
      .toArray()
      .then((orders) => {
        console.log(orders)
        return orders;
      })
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new objectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
