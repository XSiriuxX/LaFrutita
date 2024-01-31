const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123";

const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const sendMail = require("./sendmail.extra");

const user = {};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

user.getusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.getuser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "El ID no es válido" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "El ID no fue encontrado" });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.createuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(409).json({ message: "Faltan credenciales" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    if (user) {
      const user = await User.create(newUser);
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

      await sendMail({
        mail: user.email,
        message: "register",
      });

      res.status(203).json({ username, id: user._id, accessToken, expiresIn });
    } else {
      res.status(500).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "El Email ya esta en uso" });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

user.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({ message: "Faltan credenciales" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email incorrecto" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

      await sendMail({
        mail: user.email,
        message: "login",
      });

      res.status(200).json({ id: user._id, accessToken, expiresIn });
    } else {
      res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await sendMail({
      mail: user.email,
      message: "forgot-password",
    });

    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Faltan detalles del producto o del usuario" });
    }

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Usuario o producto no encontrado" });
    }

    const existingProduct = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Falta el ID de usuario" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const cartDetails = await Promise.all(
      user.cart.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);

        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          name: product ? product.productName : "Producto no encontrado",
          description: product
            ? product.productDescription
            : "Descripción no disponible",
          stockQuantity: product ? product.stockQuantity : 0,
          productImage: product ? product.productImage : "",
          productPrice: product ? product.productPrice : 0,
        };
      })
    );

    res.status(200).json(cartDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.removeCart = async (req, res) => {
  try {
    let { userId, productId, quantity } = req.body;

    if (!quantity) {
      quantity = 1;
    }

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Faltan detalles del producto o del usuario" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingProduct = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity -= quantity;

      if (existingProduct.quantity === 0) {
        user.cart = user.cart.filter(
          (item) => !item.productId.equals(productId)
        );
      }

      await user.save();
      res
        .status(200)
        .json({ message: "Producto actualizado en el carrito con éxito" });
    } else {
      res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = user;
