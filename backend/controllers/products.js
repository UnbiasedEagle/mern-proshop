import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import path from 'path';
const __dirname = path.resolve();

// @desc    Get all products
// @route   GET /api/products
// @access  PUBLIC
export const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const resultsPerPage = 10;

  const skipProducts = (page - 1) * resultsPerPage;

  let keyword = {};

  if (req.query.keyword) {
    keyword = {
      name: { $regex: req.query.keyword, $options: 'i' },
    };
  }

  const count = await Product.countDocuments(keyword);

  const products = await Product.find(keyword)
    .limit(resultsPerPage)
    .skip(skipProducts);

  return res
    .status(200)
    .json({ products, page, pages: Math.ceil(count / resultsPerPage) });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  PUBLIC
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  return res.status(200).json(product);
});

// @desc    Create a product
// @route   POST /api/products
// @access  ADMIN
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    price: 0,
    name: 'Sample Image',
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();

  return res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.image = image;
  product.description = description;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  PRIVATE
export const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const hasAlreadyReviewed = product.reviews.find(
    (el) => el.user.toString() === req.user._id.toString()
  );

  if (hasAlreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    comment,
    name: req.user.name,
    user: req.user._id,
    rating: Number(rating),
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({ message: 'Review added' });
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  ADMIN
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.remove();

  return res.status(200).json({
    message: 'Product removed',
  });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  PUBLIC
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});
