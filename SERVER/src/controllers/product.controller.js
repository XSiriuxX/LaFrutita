const mongoose = require("mongoose");

const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Rating = require("../models/Rating.model");

const product = {};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

product.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const response = products.map((product) => ({
      _id: product._id,
      productName: product.productName,
      productImage: product.productImage,
      productPrice: product.productPrice,
      categories: product.categories,
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

product.getProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "El ID no es válido" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "El ID no fue encontrado" });
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

product.postProduct = (req, res) => {
  res.status(200).json("getproduct");
};

module.exports = product;
