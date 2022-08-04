import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
        type: String,
        require: true,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);

export default Product;
