// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product) {
  const cartItems = [...this.cart.items];
  const cartIndex = cartItems.findIndex(
    (i) => i.productId.toString() === product._id.toString()
  );

  if (cartIndex >= 0) {
    this.cart.items[cartIndex].quantity = cartItems[cartIndex].quantity + 1;
  } else {
    cartItems.push({ productId: product._id, quantity: 1 });
  }

  this.cart = { items: cartItems };
  return this.save();
};

UserSchema.methods.deleteCartById = function (prodId) {
  const updatedCartItem = this.cart.items.filter(
    (i) => i.productId.toString() !== prodId.toString()
  );
  this.cart = { items: updatedCartItem };
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);
