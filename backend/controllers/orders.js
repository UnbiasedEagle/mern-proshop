import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  PRIVATE
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get Order
// @route   GET /api/orders/:id
// @access  PRIVATE
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  PRIVATE
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
  };

  const updatedOrder = await order.save();

  return res.status(200).json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  ADMIN
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  return res.status(200).json(updatedOrder);
});

// @desc    Get orders
// @route   GET /api/orders
// @access  ADMIN
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name id');

  return res.status(200).json(orders);
});

// @desc    Get logged in users orders
// @route   GET /api/orders/myorders
// @access  PRIVATE
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  return res.status(200).json(orders);
});
