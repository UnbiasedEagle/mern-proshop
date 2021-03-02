import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add name of product"],
    },
    image: {
      type: String,
      required: [true, "Please add image of product"],
    },
    brand: {
      type: String,
      required: [true, "Please add brand of product"],
    },
    category: {
      type: String,
      required: [true, "Please add category of product"],
    },
    description: {
      type: String,
      required: [true, "Please add description of product"],
    },
    reviews: [ReviewSchema],
    rating: {
      type: Number,
      required: [true, "Please add rating of product"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please add price of product"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
