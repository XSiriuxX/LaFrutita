const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    fullname: {
      type: String,
      default: "",
    },
    birthdate: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    preferencesNotifications: {
      email: {
        type: Boolean,
        default: false,
      },
      telf: {
        type: Boolean,
        default: false,
      },
    },
    userRole: {
      type: String,
      default: "Default",
    },
    activityLog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
