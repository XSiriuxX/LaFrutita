const Category = require("../models/Category.model");

const category = {};

category.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

module.exports = category;
