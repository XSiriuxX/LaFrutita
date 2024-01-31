const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  categoryName: String,
  keywords: [String],
});

module.exports = model("Category", categorySchema);
