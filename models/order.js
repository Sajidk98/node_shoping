const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
