import { Router } from 'express';
import { z } from 'zod';
import Order from '../models/Order.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { sendOrderConfirmation, sendAdminOrderAlert } from '../utils/email.js';

const router = Router();

const orderSchema = z.object({
  userId: z.string().optional(),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    size: z.string(),
    color: z.string(),
    qty: z.number().min(1),
  })).min(1),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
  delivery: z.object({
    fullName: z.string(),
    phone: z.string(),
    address: z.string(),
    location: z.string(),
  }),
  payment: z.string(),
});

// Create order
router.post('/', async (req, res, next) => {
  try {
    const data = orderSchema.parse(req.body);
    const order = await Order.create(data);

    // Send emails (don't block response if email fails)
    Promise.all([
      sendOrderConfirmation({ to: data.customerEmail, order: order.toJSON() }),
      sendAdminOrderAlert({ order: order.toJSON() }),
    ]).catch((e) => console.error('[email] failed:', e));

    res.status(201).json(order);
  } catch (e) { next(e); }
});

// Get orders for a user
router.get('/my', requireAuth, async (req, res, next) => {
    try {
      const userId = req.user._id.toString();
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });
      res.json(orders);
    } catch (e) { next(e); }
  });

// Admin - get all orders
router.get('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(200);
    res.json(orders);
  } catch (e) { next(e); }
});

// Admin - update order status
router.patch('/:id/status', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (e) { next(e); }
});

import Paystack from 'paystack';

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

router.get('/verify/:reference', async (req, res, next) => {
  try {
    const { data } = await paystack.transaction.verify(req.params.reference);
    if (data.status !== 'success') return res.status(400).json({ error: 'Payment not successful' });
    res.json({ ok: true, data });
  } catch (e) { next(e); }
});

export default router;