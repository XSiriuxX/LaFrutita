const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  comment: String,
  date: Date,
});

module.exports = model("Rating", ratingSchema);
