const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  productList: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
      productName: String,
      description: String,
      productImage: String,
    },
  ],
  purchaseDate: Date,
  orderStatus: String,
  billingInfo: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Order", orderSchema);
