// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    category: { type: String },
    price: { type: String }, 
    imageUrl: { type: String },
    createdByEmail: { type: String }, 
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
