import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  PUBLIC
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User already exists.');
  }

  user = await User.create({ name, email, password });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateAuthToken(),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  PUBLIC
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid Credentials');
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error('Invalid Credentials');
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateAuthToken(),
  });
});

// @desc    Get User Profile
// @route   POST /api/users/profile
// @access  PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user._id);

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  user = await user.save();

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateAuthToken(),
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  PRIVATE/ADMIN
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  return res.status(200).json(users);
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  PRIVATE/ADMIN
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  PRIVATE/ADMIN
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  return res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  PRIVATE/ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.remove();

  res.status(200).json({
    message: 'User removed',
  });
});
