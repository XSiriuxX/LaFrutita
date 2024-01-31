const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.URLDB)
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.error(err));
