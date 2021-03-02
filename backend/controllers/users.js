import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Login User and get the token
// @route   POST /api/users/login
// @access  PUBLIC
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check for valid email
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }

  // Check for valid password
  const isValidPassword = await user.checkPassword(password);

  if (!isValidPassword) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

// @desc    Register User and get the token
// @route   POST /api/users
// @access  PUBLIC
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  // Checking if user already exists
  if (userExists) {
    return next(new ErrorResponse("User already exists", 400));
  }

  // Creating a new user
  const user = await User.create({ name, email, password });

  const token = user.generateAuthToken();

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

// @desc    Get current logged in user
// @route   GET /api/users/profile
// @access  PRIVATE
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  PRIVATE
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  user = await user.save();

  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

// @desc    Get all users
// @route   GET /api/users/
// @access  PRIVATE/ADMIN
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  PRIVATE/ADMIN
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  await user.remove();

  return res.status(200).json({ message: "User removed" });
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  PRIVATE/ADMIN
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  return res.status(200).json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  PRIVATE/ADMIN
export const updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);

  user = await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});
