const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      default: "",
    },
    productDescription: {
      type: String,
      default: "",
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    productPrice: {
      type: Number,
      default: 0,
    },
    categories: [{ type: String }],
    productImage: {
      type: String,
      default: "",
    },
    manufacturer: {
      type: String,
      default: "",
    },
    modelNumber: {
      type: String,
      default: "",
    },
    ratingsAndComments: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    promotionsAndDiscounts: [
      {
        promotionDescription: String,
        discountPercentage: Number,
        startDate: Date,
        endDate: Date,
      },
    ],
    salesHistory: [
      {
        orderID: { type: Schema.Types.ObjectId, ref: "Order" },
        dateSold: Date,
      },
    ],
    customTags: { type: [String], default: [] },
    variantOptions: {
      type: [
        {
          optionName: String,
          optionValues: [String],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", productSchema);
