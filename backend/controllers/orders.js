import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  PRIVATE
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorResponse("No order items", 400));
  }

  const order = new Order({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  const createdOrder = await order.save();

  return res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  PRIVATE
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "name email",
  });

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  return res.status(200).json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  PRIVATE
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResults = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   PUT /api/orders/myorders
// @access  PRIVATE
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc    Get all orders
// @route   PUT /api/orders
// @access  PRIVATE/ADMIN
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate({
    path: "user",
    select: "name id",
  });

  res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/delivered
// @access  PRIVATE/ADMIN
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});
