const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const mercadopago = require("mercadopago");
const payment = {};
require("dotenv").config();

payment.createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_TOKEN,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: req.body.items,
      back_urls: {
        success: `${process.env.FRONT}/cart`,
        failure: `${process.env.FRONT}/cart`,
        pending: ``,
      },
      payer: {
        name: req.body.user_id,
      },
      notification_url: `${process.env.HOST}/payments/webhook`,
    });

    res.status(200).json({ payment_url: result.body.init_point });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la orden de pago" });
  }
};

payment.recieveWebhook = async (req, res) => {
  const payment = req.body;

  try {
    if (payment.type === "payment") {
      const response = await mercadopago.payment.findById(payment.data["id"]);

      await createOrder(response.body.additional_info);
    }
    res.status(200).json("Todo bien");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar el webhook" });
  }
};

async function createOrder(paymentDetails) {
  const productList = paymentDetails.items.map((item) => {
    return {
      _id: item.id,
      productName: item.title,
      quantity: item.quantity,
      price: item.unit_price,
      productImage: item.picture_url,
      description: item.description,
    };
  });

  const newOrder = new Order({
    productList,
    purchaseDate: new Date(),
    orderStatus: "Finalizado",
    billingInfo: paymentDetails.payer.first_name,
  });

  await User.findByIdAndUpdate(paymentDetails.payer.first_name, {
    $set: { cart: [] },
  });

  await newOrder.save();
}

payment.success = async (req, res) => {
  try {
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error);
  }
};

payment.failure = async (req, res) => {
  res.status(200).json("success");
};

module.exports = payment;
