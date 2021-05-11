import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Process Stripe Payments
// @route   POST /api/payments/process
// @access  PRIVATE
export const processPayment = asyncHandler(async (req, res) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'USD',
    description: 'ProShop Company',
    payment_method: req.body.id,
    confirm: true,
    shipping: {
      name: req.body.name,
      address: {
        line1: req.body.address,
        postal_code: req.body.postalCode,
        city: req.body.city,
        state: 'CA',
        country: 'US',
      },
    },
    receipt_email: req.body.email,
  });

  res.status(200).json({
    success: true,
    payment,
  });
});

// @desc    Send Stripe Api Key
// @route   GET /api/payments/stripeapi/key
// @access  PRIVATE
export const sendStripeApiKey = asyncHandler(async (req, res) => {
  return res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
