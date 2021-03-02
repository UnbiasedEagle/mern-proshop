import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";
import Product from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/products
// @access  PUBLIC
export const getProducts = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const products = await Product.find(keyword);

  return res.status(200).json({
    success: true,
    products,
  });
});

// @desc    Get product
// @route   GET /api/products/:id
// @access  PUBLIC
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  PRIVATE/ADMIN
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  return res.status(200).json({
    message: "Product removed",
  });
});

// @desc    Create Product
// @route   POST /api/products
// @access  PRIVATE/ADMIN
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  return res.status(201).json(createdProduct);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  PRIVATE/ADMIN
export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  return res.status(201).json(updatedProduct);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  PRIVATE
export const createProductReview = asyncHandler(async (req, res, next) => {
  const { comment, rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const alreadyReviewSubmitted = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewSubmitted) {
    return next(new ErrorResponse("Product already reviewed", 400));
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({
    message: "Review added",
  });
});
