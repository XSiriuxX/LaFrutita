const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    CATEGORIAS: { type: String, required: true },
    TIPO: { type: String },
    NOMBRE: { type: String, required: true },
    DESCRIPCION: { type: String },
    PRECIO: { type: Number, required: true },
    DISPONIBILIDAD: { type: String, required: true },
    TIEMPO_DE_PREPARACION: { type: Number, required: true },
    IMAGEN: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", productSchema);
