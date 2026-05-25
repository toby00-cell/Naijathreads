import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import User from '../models/User.js';
import { requireAuth, signToken } from '../middleware/auth.js';
import { sendVerificationEmail } from '../utils/email.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(6).max(200),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ error: 'An account with that email already exists.' });
    const passwordHash = await bcrypt.hash(data.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: 'user',
      verificationToken,
    });

    sendVerificationEmail({ to: user.email, name: user.name, token: verificationToken })
      .then(() => console.log('[email] verification sent to', user.email))
      .catch((e) => console.error('[email] verification failed:', e.message));

    res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (e) { next(e); }
});

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (e) { next(e); }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

router.get('/verify-email', async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    res.json({ ok: true, message: 'Email verified successfully' });
  } catch (e) { next(e); }
});

export default router;