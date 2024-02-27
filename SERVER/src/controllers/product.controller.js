const mongoose = require("mongoose");

const Product = require("../models/Product.model");

const product = {};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

product.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const response = products.map((product) => ({
      _id: product._id,
      NOMBRE: product.NOMBRE,
      IMAGEN:
        product.IMAGEN.trim() !== ""
          ? product.IMAGEN
          : "https://www.yiwubazaar.com/resources/assets/images/default-product.jpg",
      PRECIO: product.PRECIO,
      CATEGORIAS: product.CATEGORIAS,
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

    const response = {
      _id: product._id,
      NOMBRE: product.NOMBRE,
      DESCRIPCION: product.DESCRIPCION,
      TIPO: product.TIPO,
      DISPONIBILIDAD: product.DISPONIBILIDAD,
      IMAGEN:
        product.IMAGEN.trim() !== ""
          ? product.IMAGEN
          : "https://www.yiwubazaar.com/resources/assets/images/default-product.jpg",
      PRECIO: product.PRECIO,
      CATEGORIAS: product.CATEGORIAS,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

product.postProduct = (req, res) => {
  res.status(200).json("getproduct");
};

module.exports = product;
