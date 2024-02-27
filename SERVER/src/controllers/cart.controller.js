const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey123";

const cart = {};
const expiresIn = 24 * 60 * 60;

cart.gettemptoken = (req, res) => {
  const token = jwt.sign({ cart: [] }, SECRET_KEY, { expiresIn });

  res.json({ token });
};

cart.getCart = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    res.json({ cart: decoded.cart });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

cart.addcart = async (req, res) => {
  const { token, productId, quantity } = req.body;
  console.log(token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const existingProductIndex = decoded.cart.findIndex(
      (item) => item.product === productId
    );

    if (existingProductIndex !== -1) {
      decoded.cart[existingProductIndex].quantity += quantity;
    } else {
      decoded.cart.push({ product: productId, quantity });
    }

    const updatedToken = jwt.sign({ cart: decoded.cart }, SECRET_KEY, {
      expiresIn,
    });

    res.json({
      message: "Product added to cart",
      token: updatedToken,
      cart: decoded.cart,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

cart.removecart = async (req, res) => {
  console.log("holis");
};

module.exports = cart;
