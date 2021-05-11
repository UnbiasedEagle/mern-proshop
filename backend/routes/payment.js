import express from 'express';
import { protect } from '../middleware/auth.js';
import { processPayment, sendStripeApiKey } from '../controllers/payment.js';
const router = express.Router();

router.route('/process').post(protect, processPayment);
router.route('/stripeapi/key').get(sendStripeApiKey);

export default router;
