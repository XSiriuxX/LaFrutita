const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const {
  userRoutes,
  productRoutes,
  categoryRoutes,
  paymentRoutes,
} = require("./routes/allroutes");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/payments", paymentRoutes);

module.exports = app;
