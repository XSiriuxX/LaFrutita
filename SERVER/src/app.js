const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { productRoutes } = require("./routes/allroutes");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoutes);

module.exports = app;
