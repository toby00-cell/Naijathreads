import { Router } from 'express';
import { z } from 'zod';
import Order from '../models/Order.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { sendOrderConfirmation, sendAdminOrderAlert } from '../utils/email.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Paystack = require('paystack');
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

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

// Test email route
router.get('/test-email', async (req, res, next) => {
    try {
      console.log('[test-email] starting...');
      console.log('[test-email] GMAIL_USER:', process.env.GMAIL_USER);
      console.log('[test-email] GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
      await sendOrderConfirmation({
        to: process.env.GMAIL_USER,
        order: {
          id: 'TEST-001',
          customerName: 'Test User',
          customerEmail: process.env.GMAIL_USER,
          items: [{ name: 'Test Item', size: 'M', color: 'Black', qty: 1, price: 5000 }],
          subtotal: 5000,
          shipping: 2000,
          total: 7000,
          delivery: { fullName: 'Test User', phone: '08012345678', address: 'Test Address', location: 'Abuja — Wuse' },
          payment: 'card',
        }
      });
      console.log('[test-email] done!');
      res.json({ ok: true, message: 'Email sent' });
    } catch (e) {
      console.error('[test-email] error:', e.message, e.stack);
      res.status(500).json({ error: e.message, stack: e.stack });
    }
  });
// Create order
router.post('/', async (req, res, next) => {
  try {
    const data = orderSchema.parse(req.body);
    const order = await Order.create(data);

    sendOrderConfirmation({ to: data.customerEmail, order: order.toJSON() })
      .then(() => console.log('[email] confirmation sent to', data.customerEmail))
      .catch((e) => console.error('[email] confirmation failed:', e.message));

    sendAdminOrderAlert({ order: order.toJSON() })
      .then(() => console.log('[email] admin alert sent'))
      .catch((e) => console.error('[email] admin alert failed:', e.message));

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

// Verify Paystack payment
router.get('/verify/:reference', async (req, res, next) => {
  try {
    const { data } = await paystack.transaction.verify(req.params.reference);
    if (data.status !== 'success') return res.status(400).json({ error: 'Payment not successful' });
    res.json({ ok: true, data });
  } catch (e) { next(e); }
});

export default router;